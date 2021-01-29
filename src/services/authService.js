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
    .catch(() => toastNotification('error', 'Une erreur s\'est produite lors de la connexion'));
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