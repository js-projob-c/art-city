import { Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { IMAGES } from "@/assets";

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
    </div>
  );
};

export default AuthPage;
