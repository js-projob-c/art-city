"use client";

import { IProject } from "@art-city/common/types";
import { Tooltip } from "@mantine/core";
import React from "react";

interface IProps {
  project: IProject;
}

const CreateTaskBtn: React.FC<IProps> = ({ project }) => {
  return (
    <>
      <div>
        {/* <Tooltip label={"創建任務"}> */}
        <CreateTaskBtn project={project} />
        {/* </Tooltip> */}
      </div>
    </>
  );
};

export default CreateTaskBtn;
