import { Button, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { IMAGES } from "@/common/assets";

interface IProps {}

const AuthPage: React.FC<IProps> = ({}) => {
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
