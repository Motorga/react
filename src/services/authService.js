import { gql } from '@apollo/client';
import { toastNotification } from '../helpers/Toastify';
import { apolloClient } from './apolloClient';

export const login = (email, password) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                }
            }
        `,
        variables: {
            email,
            password,
        }
    })
    .then(response => response.data.login)
    .catch(error => toastNotification('error', error.message));
}
export const registerMember = (token, password, lastname, firstname, promotion) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($token: String!, $password: String!, $lastname: String!, $firstname: String!, $promotion: String!) {
                signup(token: $token, password: $password, lastname: $lastname, firstname: $firstname, promotion: $promotion) {
                    token
                }
            }
        `,
        variables: {
            token,
            password,
            lastname,
            firstname,
            promotion
        }
    })
    .then(response => response.data.signup)
    .catch(error => toastNotification('error', error.message));
}

export const forgotPassword = email => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($email: String!) {
                forgotPassword(email: $email) {
                    token
                }
            }
        `,
        variables: {
            email
        }
    })
    .then(response => response.data.forgotPassword)
    .catch(error => toastNotification('error', error.message))
}

export const resetPassword = (token, password) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($token: String!, $password: String!) {
                resetPassword(token: $token, password: $password) {
                    email
                }
            }
        `,
        variables: {
            token,
            password
        }
    })
    .then(response => response.data.resetPassword)
    .catch(error => toastNotification('error', error.message))
}

export const changePassword = (email, oldPassword, password) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($email: String!, $oldPassword: String!, $password: String!) {
                changePassword(email: $email, oldPassword: $oldPassword, password: $password) {
                    token
                }
            }
        `,
        variables: {
            email,
            oldPassword,
            password
        }
    })
    .then(response => response.data.changePassword)
    .catch(error => toastNotification('error', error.message))
}