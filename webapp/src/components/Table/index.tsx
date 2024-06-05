"use client";

import { DATETIME_FORMAT } from "@art-city/common/constants/datetime";
import { REGEX } from "@art-city/common/constants/regex";
import { DatetimeUtil } from "@art-city/common/utils/datetime.util";
import {
  ActionIcon,
  Collapse,
  Pagination,
  Stack,
  Table as MantineTable,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import React, { useCallback, useEffect } from "react";

import { TableValueBuilder } from "./TableValueBuilder";

export interface ITableConfig {
  name: string;
  label?: string;
  isCustom?: boolean;
  renderCustomElement?: (value: any, item: Record<string, any>) => JSX.Element;
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
  data: Record<string, any>[];
  subData?: Record<string, any>[];
  configs: ITableConfig[];
  pagination?: IPagination;
}

const Table = ({
  data,
  subData,
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
      return value ? formatValue(value, item, config.transform) : emptyText;
    },
    [emptyText, formatValue]
  );

  useEffect(() => {
    if (data) {
      const newExpanded: Record<number, boolean> = {};
      data.forEach((_, index) => {
        newExpanded[index] = false;
      });
      setExpanded(newExpanded);
    }
  }, [data]);

  return (
    <>
      {configs && data && (
        <>
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
                  <Stack key={i + item.id} w={"100%"}>
                    <MantineTable.Tr>
                      <MantineTable.Tr>
                        {subData && (
                          <MantineTable.Td>
                            <ActionIcon onClick={() => toggleExpand(i)}>
                              {!expanded[i] ? <IconPlus /> : <IconMinus />}
                            </ActionIcon>
                          </MantineTable.Td>
                        )}
                        {configs.map((config: any, index: number) => {
                          return (
                            <>
                              <MantineTable.Td>
                                {renderElement(item, config)}
                              </MantineTable.Td>
                            </>
                          );
                        })}
                      </MantineTable.Tr>
                      {subData && (
                        <MantineTable.Tr>
                          <MantineTable.Td colSpan={configs.length}>
                            <Collapse in={!!expanded[i]} w={"100%"}>
                              <MantineTable withColumnBorders>
                                <MantineTable.Thead>
                                  <MantineTable.Tr>
                                    <MantineTable.Th>Test</MantineTable.Th>
                                    <MantineTable.Th>Test</MantineTable.Th>
                                    <MantineTable.Th>Test</MantineTable.Th>
                                    <MantineTable.Th>Test</MantineTable.Th>
                                  </MantineTable.Tr>
                                </MantineTable.Thead>
                                <MantineTable.Tbody>
                                  <MantineTable.Tr>
                                    <MantineTable.Td>Test</MantineTable.Td>
                                    <MantineTable.Td>Test</MantineTable.Td>
                                    <MantineTable.Td>Test</MantineTable.Td>
                                    <MantineTable.Td>Test</MantineTable.Td>
                                  </MantineTable.Tr>
                                </MantineTable.Tbody>
                              </MantineTable>
                            </Collapse>
                          </MantineTable.Td>
                        </MantineTable.Tr>
                      )}
                    </MantineTable.Tr>
                  </Stack>
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
