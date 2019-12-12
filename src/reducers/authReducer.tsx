import { EActionType, IAuthAction, IUserAuth } from '../actions/types';

const initialState: IUserAuth = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action: IAuthAction): IUserAuth => {
  switch (action.type) {
    case EActionType.LOGIN_SUCCESS:
    case EActionType.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.data.token,
        user: action.data.user,
      };
    case EActionType.LOGIN_FAILED:
    case EActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
