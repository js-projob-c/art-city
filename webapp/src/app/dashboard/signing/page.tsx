import { Button, Flex } from "@mantine/core";
import React from "react";

interface IProps {}

const SigningPage: React.FC<IProps> = () => {
  return (
    <>
      <Flex w={"100%"} justify="flex-end">
        <Button variant="outline">簽到</Button>
      </Flex>
    </>
  );
};

export default SigningPage;
