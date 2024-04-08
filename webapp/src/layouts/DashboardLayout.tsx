import DashboardSideBar from '@/components/DashboardSideBar';
import React, { ReactNode } from 'react';
import styles from "./DashboardLayout.module.scss"

interface IProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <div className={styles.root}>
      <DashboardSideBar/>     
      <main>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
