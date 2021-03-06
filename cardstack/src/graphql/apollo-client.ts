import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { getConstantByNetwork } from '@cardstack/cardpay-sdk';
import { networkTypes } from '@rainbow-me/networkTypes';

let sokolClient: any;

export const initializeApolloClient = (network: string) => {
  const subgraphUrl = getConstantByNetwork('subgraphURL', network);

  sokolClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: subgraphUrl,
    }),
  });
};

export const getApolloClient = (network: string) => {
  if (network === networkTypes.sokol) {
    if (!sokolClient) {
      initializeApolloClient(network);
    }

    return sokolClient;
  }

  return new ApolloClient({
    cache: new InMemoryCache(),
  });
};
