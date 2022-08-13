import { Action, User } from '../../utils/interfaces';

export const CURRENT_USER_ACTION = {
  SET_CURRENT_USER: 'currentUser.set',
  CLEAR_CURRENT_USER: 'currentUser.clear',
};

const defaultState = {} as User;

const currentUser = (state = defaultState, action: Action<Partial<User> | User>) => {
  switch (action.type) {
    case CURRENT_USER_ACTION.SET_CURRENT_USER:
      return {
        ...state,
        ...action.data,
      };

    case CURRENT_USER_ACTION.CLEAR_CURRENT_USER:
      return defaultState;

    default:
      return state;
  }
};

export default currentUser;
