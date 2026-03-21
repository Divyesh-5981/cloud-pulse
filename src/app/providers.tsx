import { ApolloProvider } from '@apollo/client/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@/components/feedback/ErrorFallback';
import { AuthProvider } from '@/context/AuthProvider';
import client from '@/graphql/client';

import theme from './theme';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AuthProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {children}
            </ErrorBoundary>
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </ApolloProvider>
  );
}
