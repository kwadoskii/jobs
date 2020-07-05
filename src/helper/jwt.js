export const getJwt = () => {
    // if(localStorage.getItem('auth-token')){
        return localStorage.getItem('auth-token');
    // }
    // else {
    //     getJwt();
    // }
}

export const removeJwt = () => {
    return localStorage.removeItem('auth-token');
}