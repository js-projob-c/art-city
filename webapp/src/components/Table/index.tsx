import { DATETIME_FORMAT } from "@art-city/common/constants/datetime";
import { REGEX } from "@art-city/common/constants/regex";
import { DatetimeUtil } from "@art-city/common/utils/datetime.util";
import { Table as MantineTable } from "@mantine/core";
import React, { useCallback } from "react";

import { TableValueBuilder } from "./TableValueBuilder";

export interface ITableConfig {
  name: string;
  label?: string;
  isCustom?: boolean;
  renderCustomElement?: (value: any, item: Record<string, any>) => JSX.Element;
  transform?: (value: any, item: Record<string, any>) => any;
}

interface IProps {
  emptyText?: string;
  defaultDateTimeFormat?: string;
  data: Record<string, any>[];
  configs: ITableConfig[];
}

const Table = ({
  data,
  configs,
  emptyText = "-",
  defaultDateTimeFormat = DATETIME_FORMAT.DATETIME,
}: IProps) => {
  const formatDateTime = useCallback(
    (value: string) => {
      if (typeof value === "string" && value?.match(REGEX.DATETIME_ISO)) {
        return DatetimeUtil.moment(value).format(defaultDateTimeFormat);
      }
      return value;
    },
    [defaultDateTimeFormat]
  );

  const formatValue = useCallback(
    (value: any, item: any, transform?: (value: any) => any) => {
      return new TableValueBuilder(value, item)
        .transform(formatDateTime)
        .transform(transform)
        .build();
    },
    [formatDateTime]
  );

  function getNestedProperty(obj: Record<string, any>, path: string) {
    return path.split(".").reduce((o, p) => (o ? o[p] : undefined), obj);
  }

  const renderElement = useCallback(
    (item: any, config: any) => {
      if (config.isCustom)
        return config.renderCustomElement(item[config.name], item);
      const value = getNestedProperty(item, config.name);
      return value ? formatValue(value, item, config.transform) : emptyText;
    },
    [emptyText, formatValue]
  );

  return (
    <>
      {configs && data && (
        <MantineTable>
          <MantineTable.Thead>
            <MantineTable.Tr>
              {configs.map((config: any, i: number) => {
                return (
                  <MantineTable.Th key={config.name + i}>
                    {config.label ?? config.name}
                  </MantineTable.Th>
                );
              })}
            </MantineTable.Tr>
          </MantineTable.Thead>
          <MantineTable.Tbody>
            {data.map((item: any, i: number) => {
              return (
                <MantineTable.Tr key={i + item?.id}>
                  {configs.map((config: any, index: number) => {
                    return (
                      <MantineTable.Td key={config.name + index}>
                        {renderElement(item, config)}
                      </MantineTable.Td>
                    );
                  })}
                </MantineTable.Tr>
              );
            })}
          </MantineTable.Tbody>
        </MantineTable>
      )}
    </>
  );
};

export default Table;
