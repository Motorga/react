import { gql } from '@apollo/client';
import { apolloClient } from './apolloClient';
import { toastNotification } from '../helpers/Toastify';

export const getMarkers = () => {
    return apolloClient.query({
        query: gql`
            query {
                markers {
                    id
                    color
                    position
                    user {
                        id
                        lastname
                        firstname
                        bike
                    }
                }
            }
        `
    })
    .then(result => result.data.markers)
    .catch(() => toastNotification('error', 'Une erreur s\'est produite, veuillez réessayer plus tard'));
}

export const addMarker = ({ color, position, userId }) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation ($data: MarkerCreateInput!) {
                createMarker (data: $data) {
                    id
                    color
                    position
                    user {
                        lastname
                        firstname
                        bike
                    }
                }
            }
        `,
        variables: {
            data: {
                color,
                position,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        }
    })
    .then(result => result.data.createMarker)
    .catch(() => toastNotification('error', 'Une erreur s\'est produite, veuillez réessayer plus tard'));
}

export const deleteMarker = id => {
    return apolloClient.mutate({
        mutation: gql`
            mutation ($where: MarkerWhereUniqueInput!) {
                deleteMarker (where: $where) {
                    id
                }
            }
        `,
        variables: {
            where: {
                id
            }
        }
    })
    .then(result => result.data.deleteMarker)
    .catch(() => toastNotification('error', 'Une erreur s\'est produite, veuillez réessayer plus tard'));
}