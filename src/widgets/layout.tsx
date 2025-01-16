import { ReactNode } from 'react';

import { Header } from './header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='p-2 space-y-2'>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export { Layout };
