import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://hub.snapshot.org/graphql';

export const graphQLClient = new GraphQLClient(endpoint, { headers: {} });
