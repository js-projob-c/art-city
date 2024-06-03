"use client";
import { CreateProjectRequestDto } from "@art-city/common/dto/project/create-project-request.dto";
import { UserRole } from "@art-city/common/enums";
import { Button, Flex, Modal, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import Table, { ITableConfig } from "@/components/Table";
import {
  createProjectResolver,
  useCreateProject,
} from "@/hooks/features/projects/useCreateProject";
import { useProjects } from "@/hooks/features/projects/useGetProjects";
import useCurrentUser from "@/hooks/features/useCurrentUser";
import { useUsers } from "@/hooks/features/users/useUsers";

import styles from "./page.module.scss";

interface IProps {}

const configs: ITableConfig[] = [
  {
    name: "id",
    label: "日期",
  },
];

const ProjectPage: React.FC<IProps> = () => {
  const currentUser = useCurrentUser();
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateProjectRequestDto>({
    resolver: createProjectResolver,
  });

  const { mutateAsync, isPending } = useCreateProject();

  const { data: users = [] } = useUsers();
  const { data: projects = [] } = useProjects();

  const showCreateBtn = currentUser?.role === UserRole.ADMIN;

  const onCreateProject = async (data: CreateProjectRequestDto) => {
    await mutateAsync({ body: data });
  };

  const onOpenModal = () => {
    openModal();
  };

  console.log("users", users);

  return (
    <>
      <div className={styles.root}>
        {showCreateBtn && (
          <Flex direction={"row-reverse"} mb={50}>
            <Button onClick={onOpenModal}>創建</Button>
          </Flex>
        )}
        <Table data={projects} configs={configs} />
      </div>
      <Modal opened={opened} onClose={closeModal} title="創建項目">
        <Stack gap={"lg"}>
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="名稱"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required={true}
              />
            )}
            name={"name"}
            control={control}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="描述"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required={true}
              />
            )}
            name={"description"}
            control={control}
            defaultValue={""}
          />
          <Flex gap={"md"} justify={"flex-end"}>
            <Button variant="outline" onClick={closeModal} loading={isPending}>
              取消
            </Button>
            <Button onClick={handleSubmit(onCreateProject)} loading={isPending}>
              確認
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  );
};

export default ProjectPage;
