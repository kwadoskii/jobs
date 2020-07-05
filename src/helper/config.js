import { getJwt } from "./jwt";

export const host = 'http://192.168.43.233:5000';
export const headers = () => { return { headers: { 'auth-token': getJwt() } } }