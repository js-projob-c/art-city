"use client";

import { CreateProjectRequestDto } from "@art-city/common/dto/project/create-project-request.dto";
import { UpdateProjectRequestDto } from "@art-city/common/dto/project/update-project-request.dto";
import { ProjectStatus, UserRole } from "@art-city/common/enums";
import { IProject } from "@art-city/common/types";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Modal,
  Select,
  Stack,
  Switch,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconEdit, IconFilePlus, IconTrash } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import Table, { ITableConfig } from "@/components/Table";
import {
  createProjectResolver,
  useCreateProject,
} from "@/hooks/features/projects/useCreateProject";
import { useDeleteProject } from "@/hooks/features/projects/useDeleteProject";
import { useProjects } from "@/hooks/features/projects/useGetProjects";
import {
  updateProjectResolver,
  useUpdateProject,
} from "@/hooks/features/projects/useUpdateProject";
import useCurrentUser from "@/hooks/features/useCurrentUser";
import { useUsers } from "@/hooks/features/users/useUsers";

import CreateTaskBtn from "./CreateTaskBtn";
import styles from "./page.module.scss";

interface IProps {}

const DELETE_PROJECT_MODAL_ID = "DELETE_PROJECT_MODAL_ID";

const ProjectPage: React.FC<IProps> = () => {
  const currentUser = useCurrentUser();
  const showCreateBtn = currentUser?.role === UserRole.ADMIN;

  const [
    createModalOpened,
    { open: openCreateModal, close: closeCreateModal },
  ] = useDisclosure(false);

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);

  const {
    control: createControl,
    handleSubmit: createHandleSubmit,
    formState: { errors },
    reset: createReset,
  } = useForm<CreateProjectRequestDto>({
    resolver: createProjectResolver,
  });
  const {
    control: updateControl,
    handleSubmit: updateHandleSubmit,
    formState: { errors: updateErrors },
    reset: updateReset,
    resetField: updateResetField,
    setValue: updateSetValue,
  } = useForm<UpdateProjectRequestDto>({
    resolver: updateProjectResolver,
  });

  const { mutateAsync: createMutateAsync, isPending: isCreatePending } =
    useCreateProject();
  const { mutateAsync: updateMutateAsync, isPending: isUpdatePending } =
    useUpdateProject();
  const { mutateAsync: deleteMutateAsync, isPending: isDeletePending } =
    useDeleteProject();

  const { data: users = [] } = useUsers();
  const { data: projects = [], refetch: refetchProjects } = useProjects();

  const watchUpdateValues = useWatch({
    control: updateControl,
  });

  const [editProjectId, setEditProjectId] = useState("");

  const userOptions = useMemo(() => {
    return users.map((user) => ({
      value: user.id,
      label: user.email,
    }));
  }, [users]);

  const onCreateProject = async (data: CreateProjectRequestDto) => {
    await createMutateAsync(
      { body: data },
      {
        onSuccess: async () => {
          toast.success("Success");
          closeCreateModal();
          await refetchProjects();
        },
        onError: (error) => {
          toastErrorCode(error);
        },
      }
    );
  };

  const onEditProject = async (data: UpdateProjectRequestDto) => {
    await updateMutateAsync(
      {
        body: data,
        param: { projectId: editProjectId },
      },
      {
        onSuccess: async () => {
          toast.success("Success");
          closeEditModal();
          await refetchProjects();
        },
        onError: (error) => {
          toastErrorCode(error);
        },
      }
    );
  };

  const onDeleteProject = async (projectId: string) => {
    await deleteMutateAsync(
      { param: { projectId } },
      {
        onSuccess: async () => {
          toast.success("Success");
          modals.close(DELETE_PROJECT_MODAL_ID);
          await refetchProjects();
        },
        onError: (error) => {
          toastErrorCode(error);
        },
      }
    );
  };

  const onOpenCreateModal = () => {
    createReset({});
    openCreateModal();
  };

  const onOpenEditModal = (project: IProject) => {
    setEditProjectId(project.id);
    updateReset({
      name: project.name,
      description: project.description,
      ownerId: project.ownerId,
      isAbandoned: project.status === ProjectStatus.ABANDONED,
    });
    openEditModal();
  };

  const onCloseEditModal = () => {
    setEditProjectId("");
    closeEditModal();
  };

  const openDeleteModal = (id: string) =>
    modals.openConfirmModal({
      id: DELETE_PROJECT_MODAL_ID,
      title: "刪除項目?",
      centered: true,
      children: <></>,
      labels: { confirm: "刪除", cancel: "取消" },
      onCancel: () => {},
      onConfirm: () => onDeleteProject(id),
      confirmProps: { color: "red", loading: isDeletePending },
      cancelProps: { loading: isDeletePending },
      closeOnClickOutside: !isDeletePending,
    });

  // const onAbandonProject = (checked: boolean) => {
  //   updateSetValue("isAbandoned", checked);
  // };

  const onOpenCreateTaskModal = (project: IProject) => {};

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
            <Tooltip label="編輯">
              <ActionIcon
                variant="subtle"
                onClick={() => onOpenEditModal(item as IProject)}
              >
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="刪除">
              <ActionIcon
                variant="subtle"
                onClick={() => openDeleteModal(item.id)}
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Group>
        );
      },
    },
    // {
    //   name: "createTaskBtn",
    //   label: "",
    //   isCustom: true,
    //   renderCustomElement(value, item) {
    //     return (
    //       <Group>
    //         <CreateTaskBtn project={item as IProject} />
    //         {/* <Tooltip label="創建任務"> */}
    //         {/* <ActionIcon
    //             variant="subtle"
    //             onClick={() => onOpenCreateTaskModal(item as IProject)}
    //           >
    //             <IconFilePlus />
    //           </ActionIcon> */}
    //         {/* <CreateTaskBtn project={item as IProject} /> */}
    //         {/* </Tooltip> */}
    //       </Group>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <div className={styles.root}>
        {showCreateBtn && (
          <Flex direction={"row-reverse"} mb={50}>
            <Button onClick={onOpenCreateModal}>{"創建"}</Button>
          </Flex>
        )}
        <Table data={projects} configs={configs} subData={[]} />
      </div>
      <Modal
        opened={createModalOpened}
        onClose={closeCreateModal}
        title={`創建項目`}
      >
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
            control={createControl}
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
            control={createControl}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                clearable
                searchable
                label="負責人"
                data={userOptions}
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name={"ownerId"}
            control={createControl}
            defaultValue={undefined}
          />
          <Flex gap={"md"} justify={"flex-end"}>
            <Button
              variant="outline"
              onClick={closeCreateModal}
              loading={isCreatePending}
            >
              取消
            </Button>
            <Button
              onClick={createHandleSubmit(onCreateProject)}
              loading={isCreatePending}
            >
              確認
            </Button>
          </Flex>
        </Stack>
      </Modal>
      <Modal
        opened={editModalOpened}
        onClose={onCloseEditModal}
        title={`修改項目`}
      >
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
            control={updateControl}
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
            control={updateControl}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                clearable
                searchable
                label="負責人"
                data={userOptions}
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name={"ownerId"}
            control={updateControl}
            defaultValue={undefined}
          />
          {/* <Switch
            label="丟棄"
            defaultChecked={watchUpdateValues.isAbandoned}
            onChange={(e) => onAbandonProject(e.target.checked)}
          /> */}
          <Flex gap={"md"} justify={"flex-end"}>
            <Button
              variant="outline"
              onClick={closeEditModal}
              loading={isUpdatePending}
            >
              取消
            </Button>
            <Button
              onClick={updateHandleSubmit(onEditProject)}
              loading={isUpdatePending}
            >
              確認
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  );
};

export default ProjectPage;
