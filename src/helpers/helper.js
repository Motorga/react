import jwt_decode from 'jwt-decode';

export const isLoggedIn = (token) => {
    if (!token) {
        return false;
    }

    const { exp } = jwt_decode(token);
    const now = new Date();
    now.setDate(now.getDate() + 1);

    return (exp*1000) < now.getTime();
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