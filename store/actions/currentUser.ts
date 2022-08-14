import { AppDispatch } from '..';
import { RESOURCE_NAME } from '../../utils/constant';
import * as cookieUtils from '../../utils/cookieUtils';
import { User } from '../../utils/interfaces';
import { getDataById } from '../actions/resources';
import axios from '../axios';
import { CURRENT_USER_ACTION } from '../reducers/currentUser';

export const loginUser =
  (payload: Pick<User, 'email' | 'password'>) => async (dispatch: AppDispatch) => {
    const { data: loginRes } = await axios.post<{ id: number; token: string }>(
      '/auth/login',
      Object.assign(payload, {
        always: true,
      })
    );

    cookieUtils.setToken(loginRes.token);
    cookieUtils.setUserId(loginRes.id);

    const data = await getDataById(RESOURCE_NAME.USER, loginRes.id)();

    dispatch({ type: CURRENT_USER_ACTION.SET_CURRENT_USER, data });

    return data;
  };

export const registerUser =
  (payload: Pick<User, 'email' | 'password' | 'username'>) => async (dispatch: AppDispatch) => {
    await axios.post('/auth/register', payload);

    await loginUser(payload)(dispatch);
  };
