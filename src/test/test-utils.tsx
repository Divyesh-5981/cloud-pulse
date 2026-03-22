import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { ThemeProvider } from '@mui/material/styles';
import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement, type ReactNode } from 'react';

import { ROLE_PERMISSIONS } from '@/config/roles.config';
import { AuthContext } from '@/context/AuthContext';
import { SnackbarContext } from '@/context/SnackbarContext';
import { MOCK_USERS } from '@/graphql/mock/users';
import { type AuthContextValue, type Role, ROLES } from '@/types';

import theme from '../app/theme';

export function createMockAuthValue(
  role: Role = ROLES.ADMIN,
): AuthContextValue {
  const { id, name, initials } = MOCK_USERS[role];
  return {
    user: { id, name, initials },
    role,
    permissions: ROLE_PERMISSIONS[role],
    setRole: vi.fn(),
  };
}

export const mockShowSnackbar = vi.fn();

interface WrapperOptions {
  role?: Role;
}

function createWrapper({ role = ROLES.ADMIN }: WrapperOptions = {}) {
  const noopLink = new ApolloLink(
    () => new Observable((observer) => observer.complete()),
  );

  const client = new ApolloClient({
    link: noopLink,
    cache: new InMemoryCache(),
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={createMockAuthValue(role)}>
            <SnackbarContext.Provider
              value={{ showSnackbar: mockShowSnackbar }}
            >
              {children}
            </SnackbarContext.Provider>
          </AuthContext.Provider>
        </ThemeProvider>
      </ApolloProvider>
    );
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: WrapperOptions & Omit<RenderOptions, 'wrapper'>,
) {
  const { role, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: createWrapper({ role }),
    ...renderOptions,
  });
}
