import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <div>
      Default layout
      <main>
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
