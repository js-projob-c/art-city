import { DATETIME_FORMAT } from "@art-city/common/constants/datetime";
import { REGEX } from "@art-city/common/constants/regex";
import { DatetimeUtil } from "@art-city/common/utils/datetime.util";
import { Table as MantineTable } from "@mantine/core";
import React from "react";

import { TableValueBuilder } from "./TableValueBuilder";

export interface ITableConfig {
  header: string;
}

interface IProps {
  emptyText?: string;
  defaultDateTimeFormat?: string;
  headers: string[];
  data: any[];
  config: ITableConfig[];
}

const Table = ({
  data,
  headers,
  config,
  emptyText = "-",
  defaultDateTimeFormat = DATETIME_FORMAT.DATETIME,
}: IProps) => {
  const formatDateTime = (value: string) => {
    if (value?.match(REGEX.DATETIME_ISO)) {
      return DatetimeUtil.moment(value).format(defaultDateTimeFormat);
    }
    return value;
  };

  const formatValue = (value: any) => {
    return new TableValueBuilder(value).transform(formatDateTime).build();
  };

  return (
    <>
      {headers && data && (
        <MantineTable>
          <MantineTable.Thead>
            <MantineTable.Tr>
              {headers.map((header: string, i: number) => {
                return (
                  <MantineTable.Th key={header + i}>{header}</MantineTable.Th>
                );
              })}
            </MantineTable.Tr>
          </MantineTable.Thead>
          <MantineTable.Tbody>
            {data.map((item: any, i: number) => {
              return (
                <MantineTable.Tr key={i + item?.id}>
                  {headers.map((header: string, index: number) => {
                    return (
                      <MantineTable.Td key={header + index}>
                        {item[header] ? formatValue(item[header]) : emptyText}
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
