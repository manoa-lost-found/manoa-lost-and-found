'use client';

import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  useEffect(() => {
    // Enable Bootstrap JS behaviors: collapse, dropdown, etc.
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
