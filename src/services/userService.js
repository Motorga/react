import { gql } from '@apollo/client';
import { apolloClient } from './apolloClient';
import { toastNotification } from '../helpers/Toastify';

export const getUsers = (status) => {
    return apolloClient.query({
        query: gql`
            query ($status: [Status!]) {
                users (where: { status_in: $status}) {
                    id,
                    lastname,
                    firstname,
                    bike,
                    open,
                    promotion,
                    token,
                    status
                }
            }
        `,
        variables: {
            status
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
            mutation {
                resetAllOpen {
                    id
                    open
                }
            }
        `,
    })
    .then(result => result.data.resetAllOpen)
    .catch(error => toastNotification('error', error.message));
}

export const inviteMember = (email, role) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($email: String!, $role: String!) {
                inviteMember(email: $email, role: $role) {
                    id
                    email
                }
            }
        `,
        variables: {
            email,
            role
        }
    })
    .then(result => result.data.inviteMember)
    .catch(error => toastNotification('error', error.message));
}

export const deleteMember = id => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($id: ID!) {
                deleteUser(where: { id: $id }) {
                    id
                }
            }
        `,
        variables: {
            id
        }
    })
    .then(() => toastNotification('success', 'Membre supprimé'))
    .catch(error => toastNotification('error', error.message));
}