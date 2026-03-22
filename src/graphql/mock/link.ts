import { ApolloLink, Observable } from '@apollo/client';
import { type DocumentNode, type OperationDefinitionNode } from 'graphql';

import { mockResolvers } from './resolvers';

function getOperationName(doc: DocumentNode): string | null {
  const def = doc.definitions.find(
    (d): d is OperationDefinitionNode => d.kind === 'OperationDefinition',
  );
  return def?.name?.value ?? null;
}

const MOCK_DELAY_MS = 600;

export function createMockLink(): ApolloLink {
  return new ApolloLink((operation) => {
    return new Observable<ApolloLink.Result>((observer) => {
      const operationName = getOperationName(operation.query);

      const timer = setTimeout(() => {
        try {
          if (!operationName || !mockResolvers[operationName]) {
            observer.next({
              data: null,
              errors: [
                {
                  message: `No mock resolver found for operation "${operationName ?? 'unknown'}"`,
                } as never,
              ],
            });
            observer.complete();
            return;
          }

          const data = mockResolvers[operationName](
            operation.variables ?? {},
          ) as Record<string, unknown>;

          observer.next({ data });
          observer.complete();
        } catch (error) {
          observer.next({
            data: null,
            errors: [
              {
                message:
                  error instanceof Error
                    ? error.message
                    : 'Mock resolver error',
              } as never,
            ],
          });
          observer.complete();
        }
      }, MOCK_DELAY_MS);

      return () => clearTimeout(timer);
    });
  });
}
