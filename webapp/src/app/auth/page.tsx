"use client";

import { Button, Image } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { IMAGES } from "@/common/assets";
import { QUERY_KEY } from "@/common/constants/enums";
import { queryClient } from "@/services/query";

import { useLogin } from "./use-login";

// import { useRetailerLogin } from "./use-login";

interface IProps {}

const AuthPage: React.FC<IProps> = ({}) => {
  // const {} = useRetailerLogin();
  // queryClient.prefetchQuery({
  //   queryKey: [QUERY_KEY.LOGIN],
  //   queryFn: login,
  // });

  const { data, isError, isLoading, isPending } = useLogin();

  // const { data, isLoading, isPending } = useQuery({
  //   queryKey: [QUERY_KEY.LOGIN],
  //   // queryFn: async () => {
  //   //   const res = await fetch("http://localhost:8081/api/test");
  //   //   const json = await res.json();
  //   //   console.log("json", json);
  //   //   return json;
  //   // },
  //   queryFn: login,
  // });
  // const { data } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => {
  //     console.log("success");
  //   },
  //   onError: () => {
  //     console.log("error");
  //   },
  // });

  console.log("datadatadata", data);
  console.log("isLoading", isLoading);
  console.log("isPending", isPending);

  return (
    <div>
      AuthPage
      <Image
        src={IMAGES.logoSquare.src}
        alt="Website Logo"
        fit="contain"
        h={200}
        w={"auto"}
      />
      <Button>Login</Button>
    </div>
  );
};

export default AuthPage;
