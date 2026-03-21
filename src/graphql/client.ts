import { ApolloClient, InMemoryCache } from '@apollo/client';

import { createMockLink } from './mock/link';

const client = new ApolloClient({
  link: createMockLink(),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
