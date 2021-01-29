import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_SERVER,
    cache: new InMemoryCache(),
    request: (operation) => {
        const token = window.localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        });
    }
});