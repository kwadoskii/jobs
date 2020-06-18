export const getJwt = () => {
    return localStorage.getItem('auth-token');
}

export const removeJwt = () => {
    return localStorage.removeItem('auth-token');
}
