"use client";

import { Button, Image } from "@mantine/core";
import React from "react";

import { IMAGES } from "@/common/assets";
import { ACCESS_TOKEN_KEY } from "@/common/constants/variables";
import { TokenUtil } from "@/common/utils/token";
import { useLogin } from "@/hooks/features/useLogin";

interface IProps {}

const AuthPage: React.FC<IProps> = ({}) => {
  const { data, isPending, mutateAsync } = useLogin();

  const onLogin = async () => {
    mutateAsync(
      {
        body: {
          email: "employee@gmail.com",
          password: "Pa33word",
        },
      },
      {
        onSuccess(data) {
          const { access_token } = data;
          TokenUtil.storeToken(ACCESS_TOKEN_KEY, access_token);
        },
        onError(error) {
          console.error(error);
          TokenUtil.removeToken(ACCESS_TOKEN_KEY);
        },
      }
    );
  };

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
      <Button onClick={onLogin}>Login</Button>
    </div>
  );
};

export default AuthPage;
