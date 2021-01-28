import { ApolloClient, InMemoryCache } from '@apollo/client';

const token = window.localStorage.getItem('token');

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
    request: (operation) => {
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        });
    }
});