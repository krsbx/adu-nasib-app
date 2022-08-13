import Cookies from 'js-cookie';

export const setUserId = (userId: number | string) => Cookies.set('userId', String(userId));

export const getUserId = () => Cookies.get('userId') as number | null | undefined;

export const removeUserId = () => Cookies.remove('userId');

export const setToken = (token: string) => Cookies.set('token', token);

export const getToken = () => Cookies.get('token') as string | null | undefined;
