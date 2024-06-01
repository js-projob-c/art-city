import { UserRole } from "@art-city/common/enums";

export type SideNavbarConfigType = {
  href: string;
  label: string;
  children?: SideNavbarConfigType[];
  roles?: UserRole[];
};

export const dashboardSideNavbarConfig: SideNavbarConfigType[] = [
  {
    href: "/dashboard",
    label: "主頁",
  },
  {
    href: "",
    label: "員工管理",
    children: [
      {
        href: "/dashboard/signing",
        label: "簽到/簽出",
      },
      {
        href: "/dashboard/schedule",
        label: "排班",
      },
      {
        href: "/dashboard/shift",
        label: "換班",
      },
      {
        href: "/dashboard/leave",
        label: "休假",
      },
    ],
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
