"use client";

import { Box, Button, Flex, Stack } from "@mantine/core";
import React from "react";
import toast from "react-hot-toast";

import Table from "@/components/Table";
import { useSignInOrOut } from "@/hooks/features/attendances/useSignInOrOut";
import {
  IUserAttendance,
  useUserAttendances,
} from "@/hooks/features/attendances/useUserAttendances";

interface IProps {}

const SigningPage: React.FC<IProps> = () => {
  const { mutateAsync } = useSignInOrOut();
  const { data, refetch } = useUserAttendances();

  const onSignInOrOut = async () => {
    mutateAsync(
      {
        body: {},
      },
      {
        async onSuccess(data) {
          console.log("data", data);
          toast.success("success");
          await refetch();
        },
        onError(error) {
          console.error(error);
          toast.error("failed");
        },
      }
    );
  };

  const config = [
    {
      header: "signInAt",
    },
    {
      header: "signOutAt",
    },
    {
      header: "status",
    },
    {
      header: "signOut",
    },
    {
      header: "supportDocument",
    },
    {
      header: "remarks",
    },
  ];

  return (
    <>
      <Stack>
        <Flex w={"100%"} justify={"flex-end"}>
          <Button variant="outline" onClick={onSignInOrOut}>
            簽到
          </Button>
        </Flex>
        <Box>
          {data && (
            <Table
              config={config}
              data={data}
              headers={[
                "signInAt",
                "signOutAt",
                "status",
                "signOut",
                "supportDocument",
                "remarks",
              ]}
            />
          )}
          {/* {data?.map((attendance: IUserAttendance) => {
            return `${attendance.status}`;
          })} */}
        </Box>
      </Stack>
    </>
  );
};

export default SigningPage;
