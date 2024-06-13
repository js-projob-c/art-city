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
    label: "我的",
    children: [
      {
        href: "/dashboard/calendar",
        label: "月曆",
        // roles: [UserRole.EMPLOYEE],
      },
      {
        href: "/dashboard/signing",
        label: "簽到/簽出",
        // roles: [UserRole.EMPLOYEE],
      },
      {
        href: "/dashboard/schedule",
        label: "排班",
        // roles: [UserRole.EMPLOYEE],
      },
      {
        href: "/dashboard/shift",
        label: "換班",
        // roles: [UserRole.EMPLOYEE],
      },
      {
        href: "/dashboard/leave",
        label: "休假",
        // roles: [UserRole.EMPLOYEE],
      },
    ],
  },
  {
    href: "",
    label: "員工管理",
    children: [
      {
        href: "/dashboard/manage/user",
        label: "員工資料",
        roles: [UserRole.ADMIN],
      },
      {
        href: "/dashboard/manage/leave",
        label: "員工休假",
        roles: [UserRole.ADMIN],
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
    ],
  },
];
