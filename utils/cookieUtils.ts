import Cookies from 'js-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const setUserId = (userId: number | string) => Cookies.set('userId', String(userId));

export const getUserId = () => Cookies.get('userId') as number | null | undefined;

export const removeUserId = () => Cookies.remove('userId');

export const setToken = (token: string) => Cookies.set('token', token);

export const getToken = () => Cookies.get('token') as string | null | undefined;

export const isAuthenticated = () => {
  const token = getToken();

  if (!token) return false;

  const { exp } = jwtDecode(token) as JwtPayload;

  if (!exp) return false;

  return exp * 1000 > Date.now();
};
