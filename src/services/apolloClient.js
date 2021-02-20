import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_SERVER,
});
  
const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    }
});