import { gql } from '@apollo/client';
import { apolloClient } from './apolloClient';
import { toastNotification } from '../helpers/Toastify';

export const getEvents = () => {
    return apolloClient.query({
        query: gql`
            query {
                events {
                    id
                    name
                    description
                    date
                    owner {
                        id
                        lastname
                        firstname
                    }
                    participants {
                        id
                    }
                }
            }
        `,
    })
    .then(result => result.data.events)
    .catch(() => toastNotification('error', 'Une erreur s\'est produite, veuillez réessayer plus tard'));
}

export const getEvent = id => {
    return apolloClient.query({
        query: gql`
            query ($where: EventWhereUniqueInput!) {
                event (where: $where) {
                    id
                    name
                    description
                    date
                    owner {
                        id
                        lastname
                        firstname
                    }
                    participants {
                        id
                        lastname
                        firstname
                    }
                }
            }
        `,
        variables: {
            where: {
                id
            }
        }
    })
    .then(result => result.data.event)
    .catch(() => toastNotification('error', 'Une erreur s\'est produite, veuillez réessayer plus tard'));
}

export const addEvent = ({ name, description, date, userId}) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation ($data: EventCreateInput!) {
                createEvent(data: $data) {
                    id
                    name
                    description
                    date
                    owner {
                        lastname
                        firstname
                    }
                }
            }
                
        `,
        variables: {
            data: {
                name,
                description,
                date,
                owner: {
                    connect: {
                        id: userId
                    }
                },
                participants: {
                    connect: {
                        id: userId
                    }
                }
            }
        }
    })
    .then(result => result.data.createEvent)
    .catch(() => toastNotification('error', 'Une erreur s\'est produite, veuillez réessayer plus tard'));
}

export const updateEvent = (id) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation ($where: EventWhereInput, $data: EventUpdateInput) {
                updateEvent(where: $where, data: $data) {
                    id
                    name
                    description
                    date
                    owner {
                        lastname
                        firstname
                    }
                }
            }
                
        `,
        variables: {
            where: {
                id
            },
            data: {
                
            }
        }
    })
    .then(result => result.data.updateEvent)
    .catch(() => toastNotification('error', 'Une erreur s\'est produite, veuillez réessayer plus tard'));
}

export const deleteEvent = id => {
    return apolloClient.mutate({
        mutation: gql`
            mutation($where: EventWhereUniqueInput!) {
                deleteEvent(where: $where) {
                    id
                    name
                    description
                    date
                    owner {
                        id
                        lastname
                        firstname
                    }
                    participants {
                        id
                    }
                }
            }
        `,
        variables: {
            where: {
                id
            }
        }
    })
    .then(result => result.data.deleteEvent)
    .catch(() => toastNotification('error', 'Une erreur s\'est produite, veuillez réessayer plus tard'));
}

export const addParticipantToEvent = (connectOrDisconnect, id, userId) => {
    let query = {};

    if (connectOrDisconnect === 'connect') {
        query = {
            connect: {
                id: userId
            }
        }
    } else if (connectOrDisconnect === 'disconnect') {
        query = {
            disconnect: {
                id: userId
            }
        }
    }

    return apolloClient.mutate({
        mutation: gql`
            mutation($where: EventWhereUniqueInput!, $data: EventUpdateInput!) {
                updateEvent(where: $where, data: $data) {
                    id
                    name
                    description
                    date
                    owner {
                        id
                        lastname
                        firstname
                    }
                    participants {
                        id
                    }
                }
            }
        `,
        variables: {
            where: {
                id
            },
            data: {
                participants: query
            }
        }
    })
    .then(result => result.data.updateEvent)
    .catch(() => toastNotification('error', 'Une erreur s\'est produite, veuillez réessayer plus tard'));
}