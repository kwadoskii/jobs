import { getJwt } from "./jwt";

export const host = 'http://localhost:5000';
export const headers = () => { return { headers: { 'auth-token': getJwt() } } }