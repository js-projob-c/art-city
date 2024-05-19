import { Center } from "@mantine/core";
import Image from "next/image";
import React from "react";

import { IMAGES } from "@/common/assets";

import styles from "./page.module.scss";

interface IProps {}

const DashboardPage: React.FC<IProps> = () => {
  return (
    <Center w={"100%"}>
      <Image
        src={IMAGES.logoSquare}
        alt="Square logo"
        width={250}
        height={250}
      />
    </Center>
  );
};

export default DashboardPage;
