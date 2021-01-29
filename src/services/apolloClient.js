import { ApolloClient, InMemoryCache } from '@apollo/client';

const token = window.localStorage.getItem('token');

export const apolloClient = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_SERVER,
    cache: new InMemoryCache(),
    request: (operation) => {
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        });
    }
});