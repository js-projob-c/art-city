"use client";

import { ExternalPartyType } from "@art-city/common/enums";
import { Flex, Group, Stack } from "@mantine/core";
import React from "react";

import FloatingButtons from "@/components/Buttons/FloatingButtons";
import Table, { ITableConfig } from "@/components/Table";
import { useExternalParties } from "@/hooks/features/external-parties/useGetExternalParty";
import { useExternalProjects } from "@/hooks/features/external-projects/useGetExternalProjects";

import CreateExternalProjectButton from "./CreateExternalProjectButton";
import CreateExternalProjectPartyButton from "./CreateExternalProjectPartyButton";
import DeleteExternalPartyButton from "./DeleteExternalPartyButton";
import DeleteExternalProjectButton from "./DeleteExternalProjectButton";
import styles from "./page.module.scss";
import UpdateExternalPartyButton from "./UpdateExternalPartyButton";
import UpdateExternalProjectButton from "./UpdateExternalProjectButton";

enum DisplayTable {
  PROJECTS,
  PARTIES,
}

const OutsourcePage = () => {
  const [displayTable, setDisplayTable] = React.useState<DisplayTable>(
    DisplayTable.PROJECTS
  );

  const { data: externalProjects = [], refetch: refetchExternalProjects } =
    useExternalProjects();
  const { data: externalParties = [], refetch: refetchExternalParties } =
    useExternalParties({ query: { type: ExternalPartyType.EXTERNAL_PROJECT } });

  const projectTableConfigs: ITableConfig[] = [
    {
      name: "name",
      label: "名稱",
    },
    {
      name: "description",
      label: "描述",
    },
    {
      name: "status",
      label: "狀態",
    },
    {
      name: "externalPartyDetails.company",
      label: "公司名稱",
    },
    {
      name: "externalPartyDetails.company",
      label: "公司名稱",
    },
    {
      name: "externalPartyDetails.contactName",
      label: "聯絡人",
    },
    {
      name: "createdAt",
      label: "建立時間",
    },
    {
      name: "actionBtn",
      label: "",
      isCustom: true,
      renderCustomElement(value, item) {
        return (
          <Group>
            <UpdateExternalProjectButton
              externalProject={item}
              onSuccess={refetchExternalProjects}
            />
            <DeleteExternalProjectButton
              externalProject={item}
              onSuccess={refetchExternalProjects}
            />
          </Group>
        );
      },
    },
  ];

  const partyTableConfigs: ITableConfig[] = [
    {
      name: "company",
      label: "名稱",
    },
    {
      name: "contactName",
      label: "聯絡人",
    },
    {
      name: "contactRole",
      label: "職位",
    },
    {
      name: "email",
      label: "電郵",
    },
    {
      name: "phone",
      label: "電話",
    },
    {
      name: "createdAt",
      label: "建立時間",
    },
    {
      name: "actionBtn",
      label: "",
      isCustom: true,
      renderCustomElement(value, item) {
        return (
          <Group>
            <UpdateExternalPartyButton
              externalParty={item}
              onSuccess={refetchExternalParties}
            />
            <DeleteExternalPartyButton
              externalParty={item}
              onSuccess={refetchExternalParties}
            />
          </Group>
        );
      },
    },
  ];

  const floatingButtons = [
    {
      label: "項目",
      onSelected: () => {
        setDisplayTable(DisplayTable.PROJECTS);
      },
    },
    {
      label: "公司",
      onSelected: () => {
        setDisplayTable(DisplayTable.PARTIES);
      },
    },
  ];

  return (
    <Stack className={styles.root} gap={15}>
      <Flex direction={"row-reverse"} mb={50}>
        <Group>
          <CreateExternalProjectPartyButton
            onSuccess={() => {
              refetchExternalParties();
            }}
          />
          <CreateExternalProjectButton
            onSuccess={() => {
              refetchExternalProjects();
              refetchExternalParties();
            }}
          />
        </Group>
      </Flex>
      <FloatingButtons buttons={floatingButtons} />
      {displayTable === DisplayTable.PROJECTS && (
        <Table data={externalProjects} configs={projectTableConfigs} />
      )}
      {displayTable === DisplayTable.PARTIES && (
        <Table data={externalParties} configs={partyTableConfigs} />
      )}
    </Stack>
  );
};

export default OutsourcePage;
