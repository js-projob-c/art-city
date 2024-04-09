export type SideNavbarConfigType = {
  href: string;
  label: string;
  children?: SideNavbarConfigType[];
};

export const dashboardSideNavbarConfig: SideNavbarConfigType[] = [
  {
    href: "/dashboard",
    label: "主頁",
  },
  {
    href: "",
    label: "營運管理",
    children: [
      {
        href: "/dashboard/project",
        label: "項目一覽",
      },
      {
        href: "/dashboard/outsource",
        label: "外判第三方任務",
      },
      {
        href: "/dashboard/time",
        label: "項目時間表",
      },
    ],
  },
];
