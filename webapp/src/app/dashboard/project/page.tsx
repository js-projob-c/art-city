"use client";

import { CreateProjectRequestDto } from "@art-city/common/dto/project/create-project-request.dto";
import { UserRole } from "@art-city/common/enums";
import { IProject, ITask, IUser } from "@art-city/common/types";
import {
  Button,
  Flex,
  Group,
  Modal,
  Select,
  Spoiler,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import Table, { ITableConfig } from "@/components/Table";
import {
  createProjectResolver,
  useCreateProject,
} from "@/hooks/features/projects/useCreateProject";
import { useProjects } from "@/hooks/features/projects/useGetProjects";
import useCurrentUser from "@/hooks/features/useCurrentUser";
import { useUsers } from "@/hooks/features/users/useUsers";

import CreateProjectButton from "./CreateProjectButton";
import CreateTaskButton from "./CreateTaskButton";
import DeleteProjectButton from "./DeleteProjectButton";
import DeleteTaskButton from "./DeleteTaskButton";
import styles from "./page.module.scss";
import UpdateProjectButton from "./UpdateProjectButton";
import UpdateTaskButton from "./UpdateTaskButton";

interface IProps {}

const ProjectPage: React.FC<IProps> = () => {
  const currentUser = useCurrentUser();
  const showCreateBtn = currentUser?.role === UserRole.ADMIN;

  const { data: projects = [], refetch: refetchProjects } = useProjects();

  const configs: ITableConfig[] = [
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
      name: "owner.email",
      label: "負責人",
    },
    {
      name: "completedAt",
      label: "完成時間",
    },
    {
      name: "actionBtn",
      label: "",
      isCustom: true,
      renderCustomElement(value, item) {
        return (
          <Group>
            <UpdateProjectButton
              project={item as IProject & { users: IUser[] }}
              onSuccess={refetchProjects}
            />
            <DeleteProjectButton
              project={item as IProject}
              onSuccess={refetchProjects}
            />
            <CreateTaskButton
              project={item as IProject}
              onSuccess={refetchProjects}
            />
          </Group>
        );
      },
    },
  ];

  const subDataConfigs: ITableConfig[] = [
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
      name: "users",
      label: "負責人",
      transform(value, item) {
        return (
          <Spoiler hideLabel={"Hide"} showLabel={"Show"} maxHeight={25}>
            {value?.length > 0
              ? value.map((user: any) => user.email).join(", ")
              : "-"}
          </Spoiler>
        );
      },
    },
    {
      name: "progress",
      label: "進度 (%)",
    },
    {
      name: "completedAt",
      label: "完成時間",
    },
    {
      name: "actionBtn",
      label: "",
      isCustom: true,
      renderCustomElement(value, item) {
        return (
          <Group>
            <UpdateTaskButton task={item as any} onSuccess={refetchProjects} />
            <DeleteTaskButton
              task={item as ITask}
              onSuccess={refetchProjects}
            />
          </Group>
        );
      },
    },
  ];

  return (
    <>
      <div className={styles.root}>
        {showCreateBtn && (
          <Flex direction={"row-reverse"} mb={50}>
            <CreateProjectButton onSuccess={refetchProjects} />
          </Flex>
        )}
        <Table
          data={projects}
          configs={configs}
          subDataConfigs={subDataConfigs}
          subDataField="tasks"
        />
      </div>
    </>
  );
};

export default ProjectPage;
