import { getJwt } from "./jwt";

export const secret = process.env.TOKEN_SECRET;
export const host = 'http://192.168.43.233:5000';
export const headers = { headers: { 'auth-token': getJwt() } }