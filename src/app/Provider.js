'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { AuthGuard } from './AuthGuard';
import { privyConfig } from './privyConfig';


export function Providers ({ children }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      config={privyConfig}
    >
      <AuthGuard>
        {children}
      </AuthGuard>
    </PrivyProvider>
  );
}
