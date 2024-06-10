"use client";

import { DATETIME_FORMAT } from "@art-city/common/constants/datetime";
import { REGEX } from "@art-city/common/constants/regex";
import { DatetimeUtil } from "@art-city/common/utils/datetime.util";
import {
  ActionIcon,
  Collapse,
  Pagination,
  Table as MantineTable,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { isNil } from "lodash";
import React, { useCallback, useEffect } from "react";

import { TableValueBuilder } from "./TableValueBuilder";

export interface ITableConfig {
  name: string;
  label?: string;
  isCustom?: boolean;
  renderCustomElement?: (value: any, item: IProps["data"][0]) => JSX.Element;
  transform?: (value: any, item: Record<string, any>) => any;
}

interface IPagination {
  activePage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

interface IProps {
  emptyText?: string;
  defaultDateTimeFormat?: string;
  data: any[];
  subDataField?: string;
  subDataConfigs?: ITableConfig[];
  configs: ITableConfig[];
  pagination?: IPagination;
}

const Table = ({
  data,
  subDataField,
  subDataConfigs,
  configs,
  emptyText = "-",
  defaultDateTimeFormat = DATETIME_FORMAT.DATETIME,
  pagination,
}: IProps) => {
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

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
      return !isNil(value)
        ? formatValue(value, item, config.transform)
        : emptyText;
    },
    [emptyText, formatValue]
  );

  useEffect(() => {
    if (data) {
      setExpanded((prev) => {
        const newExpanded: Record<number, boolean> = { ...prev };
        data.forEach((_, index) => {
          newExpanded[index] = prev[index] ?? false;
        });
        return newExpanded;
      });
    }
  }, [data]);

  useEffect(() => {
    setExpanded({});
  }, [pagination?.activePage]);

  return (
    <>
      {configs && data && (
        <>
          <MantineTable
            highlightOnHover
            striped={subDataConfigs ? "even" : false}
          >
            <MantineTable.Thead>
              <MantineTable.Tr>
                {subDataConfigs && <MantineTable.Th />}
                {configs.map((config: any, i: number) => {
                  return (
                    <MantineTable.Th key={`header-${i}-${config.name}`}>
                      {config.label ?? config.name}
                    </MantineTable.Th>
                  );
                })}
              </MantineTable.Tr>
            </MantineTable.Thead>
            <MantineTable.Tbody>
              {data.map((item: any, i: number) => {
                const subDataItems =
                  subDataField && item[subDataField]
                    ? item[subDataField]
                    : null;
                return (
                  <React.Fragment key={item.id + i}>
                    <MantineTable.Tr>
                      {subDataConfigs && (
                        <MantineTable.Td>
                          {subDataItems?.length > 0 && (
                            <ActionIcon onClick={() => toggleExpand(i)}>
                              {!expanded[i] ? <IconPlus /> : <IconMinus />}
                            </ActionIcon>
                          )}
                        </MantineTable.Td>
                      )}
                      {configs.map((config: any, i: number) => {
                        return (
                          <MantineTable.Td key={`data-${i}-${config.name}`}>
                            {renderElement(item, config)}
                          </MantineTable.Td>
                        );
                      })}
                    </MantineTable.Tr>
                    {subDataConfigs && subDataItems?.length > 0 && (
                      <MantineTable.Tr w={"100%"}>
                        <MantineTable.Td p={0} colSpan={1}></MantineTable.Td>
                        <MantineTable.Td p={0} colSpan={configs.length}>
                          <Collapse in={!!expanded[i]}>
                            <MantineTable
                              withColumnBorders
                              withRowBorders
                              withTableBorder
                            >
                              <MantineTable.Thead>
                                <MantineTable.Tr>
                                  {subDataConfigs.map((config, i) => (
                                    <MantineTable.Th
                                      key={`subheader-${i}-${config.name}`}
                                    >
                                      {config.label ?? config.name}
                                    </MantineTable.Th>
                                  ))}
                                </MantineTable.Tr>
                              </MantineTable.Thead>
                              <MantineTable.Tbody>
                                {subDataItems.map((subItem: any, i: number) => {
                                  return (
                                    <MantineTable.Tr key={subItem.id + i}>
                                      {subDataConfigs.map((config, index) => {
                                        return (
                                          <MantineTable.Td
                                            key={`subdata-${index}-${config.name}`}
                                          >
                                            {renderElement(subItem, config)}
                                          </MantineTable.Td>
                                        );
                                      })}
                                    </MantineTable.Tr>
                                  );
                                })}
                              </MantineTable.Tbody>
                            </MantineTable>
                          </Collapse>
                        </MantineTable.Td>
                      </MantineTable.Tr>
                    )}
                  </React.Fragment>
                );
              })}
            </MantineTable.Tbody>
          </MantineTable>
          {pagination && (
            <Pagination
              total={pagination.totalPage}
              value={pagination.activePage}
              onChange={pagination.onPageChange}
              mt="sm"
            />
          )}
        </>
      )}
    </>
  );
};

export default Table;
