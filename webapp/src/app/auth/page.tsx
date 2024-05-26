"use client";

import { LoginRequestDto } from "@art-city/common/dto/auth/LoginRequest.dto";
import { Button, Image, Stack, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { IMAGES } from "@/common/assets";
import { loginResolver, useLogin } from "@/hooks/features/auth/useLogin";

interface IProps {}

const AuthPage: React.FC<IProps> = ({}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginRequestDto>({ resolver: loginResolver });
  const router = useRouter();
  const { data, isPending, mutateAsync } = useLogin();

  const onLogin = async (data: { email: string; password: string }) => {
    mutateAsync(
      {
        body: {
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess(data) {
          router.push("/");
          router.refresh();
          toast.success("Login success");
        },
        onError(error) {
          console.error(error);
          // removeValue();
          toast.error("Login failed");
        },
      }
    );
  };

  const onSubmit = async (data: LoginRequestDto) => {
    await onLogin(data);
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
      <Stack gap={"md"}>
        <Controller
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              label="Email"
              name="email"
              type="email"
              required
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              error={error?.message}
            />
          )}
          name={"email"}
          control={control}
          defaultValue={""}
        />
        <Controller
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              label="Password"
              name="password"
              type="password"
              required
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              error={error?.message}
            />
          )}
          name={"password"}
          control={control}
          defaultValue={""}
        />

        <Button onClick={handleSubmit(onSubmit)}>Login</Button>
      </Stack>
    </div>
  );
};

export default AuthPage;
