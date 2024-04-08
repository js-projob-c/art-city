import DashboardLayout from './DashboardLayout';
import { ReactNode } from 'react';
import { headers } from 'next/headers';
import DefaultLayout from './DefaultLayout';
import AuthLayout from './AuthLayout';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

const layouts = {
  auth: AuthLayout,
  dashboard: DashboardLayout,
};

interface IProps {
   children: ReactNode 
}

// Define a component that will wrap your page
const LayoutWrapper: React.FC<IProps> = ({ children }) => {
  const headersList = headers();
  const pathname = getPathname(headersList);
  const Layout = getLayoutByPath(pathname);

  return <Layout>{children}</Layout>;
};

function getLayoutByPath(path: string): React.FC<any> {
  for(const [key, layout] of Object.entries(layouts)) {
    if(path.startsWith(`/${key}`)) {
      return layout;
    }
  }
  return DefaultLayout;
}

function getPathname(headersList: ReadonlyHeaders): string {
  const domain = headersList.get('host') || "";
  const header_url = headersList.get('x-url') || "";
  const [,pathname] = header_url.match(new RegExp(`https?:\/\/${domain}(.*)`))||[];
  return pathname || "";
}

export default LayoutWrapper;