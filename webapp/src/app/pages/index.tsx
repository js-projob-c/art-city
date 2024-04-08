import { AppLayoutProps } from "next/app";
import type { ReactElement } from "react";

import Dashboard from "../layouts/Dashboard";

const Page: AppLayoutProps = () => {
  return <p>hello world</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard>{page}</Dashboard>;
};

export default Page;
