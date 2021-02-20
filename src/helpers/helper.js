import jwt_decode from 'jwt-decode';

export const isLoggedIn = (token) => {
    if (!token) {
        return false;
    }

    const { exp } = jwt_decode(token);
    let now = new Date();
    now = Math.round(now.getTime() / 1000)

    return exp > now;
}

export const jsonParse = (payload) => {
    try {
        return JSON.parse(payload);
    } catch(error) {
        return {};
    }
}

export const jsonStringify = (payload) => {
    try {
        return JSON.stringify(payload);
    } catch (error) {
        return '';
    }
}

export const formatDateTime = (date) => {
    const dateObject = new Date(date);

    const hours = dateObject.getHours() < 10 ? `0${dateObject.getHours()}` : dateObject.getHours();
    const minutes = dateObject.getMinutes() < 10 ? `0${dateObject.getMinutes()}` : dateObject.getMinutes();
    const seconds = dateObject.getSeconds() < 10 ? `0${dateObject.getSeconds()}` : dateObject.getSeconds();
    return `${dateObject.toLocaleDateString('fr-FR')} ${hours}:${minutes}:${seconds}`
}