import { gql } from '@apollo/client';
import { apolloClient } from './apolloClient';
import { toastNotification } from '../helpers/Toastify';

export const getUsers = (status) => {
    return apolloClient.query({
        query: gql`
            query ($status: [Status!]) {
                users (where: { status_in: $status}) {
                    id
                    email
                    lastname
                    firstname
                    bike
                    open
                    promotion
                    token
                    status
                }
            }
        `,
        variables: {
            status
        }
    })
    .then(result => result.data.users)
    .catch(() => toastNotification('error', 'Une erreur s\'est produite, veuillez réessayer plus tard'));
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
                    lastname
                    firstname
                    bike
                    open
                    promotion
                    token
                    status
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

export const editMember = (id, email, lastname, firstname, promotion, bike) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
                updateUser(data: $data, where: $where) {
                    id
                    email
                    lastname
                    firstname
                    promotion
                    bike
                    open
                    role
                    status
                }
            }
        `,
        variables: {
            data: {
                email,
                lastname,
                firstname,
                promotion,
                bike
            },
            where: {
                id
            }
        }
    })
    .then(result => result.data.updateUser)
    .catch(() => toastNotification('error', "Une erreur est survenue, veuillez réessayer plus tard"));
}

export const deleteMember = id => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($id: ID!) {
                deleteMember(id: $id) {
                    id
                    email
                    lastname
                    firstname
                    bike
                    open
                    promotion
                    token
                    status
                }
            }
        `,
        variables: {
            id
        }
    })
    .then(result => result.data.deleteMember)
    .catch(error => toastNotification('error', error.message));
}