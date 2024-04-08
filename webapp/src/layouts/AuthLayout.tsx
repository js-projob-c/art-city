import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const AuthLayout: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <div>
      Auth Layout
      <main>
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
