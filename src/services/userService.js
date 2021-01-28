import { gql } from '@apollo/client';
import { apolloClient } from './apolloClient';
import { toastNotification } from '../helpers/Toastify';

export const getUsers = () => {
    return apolloClient.query({
        query: gql`
            query ($token: String) {
                users (where: { token: $token}) {
                    id,
                    lastname,
                    firstname,
                    open,
                    promotion,
                    bike
                }
            }
        `,
        variables: {
            token: null
        }
    })
    .then(result => result.data.users)
    .catch(error => toastNotification('error', error.message));
}

export const updateOpenToUser = (id, open) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($id: ID!, $open: Int!) {
                updateOpenToUser(id: $id, open: $open) {
                    id
                    open
                }
            }
        `,
        variables: {
            id,
            open
        }
    })
    .then(result => result.data.updateOpenToUser)
    .catch(error => toastNotification('error', error.message));
}

export const resetAllOpen = () => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($id: ID) {
                resetAllOpen(id: $id) {
                    id
                    open
                }
            }
        `,
    })
    .then(result => result.data.resetAllOpen)
    .catch(error => toastNotification('error', error.message));
}