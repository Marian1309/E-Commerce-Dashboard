import type { FC, ReactNode } from 'react';

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='h-screen flex-center'>{children}</div>;
};

export default AuthLayout;
