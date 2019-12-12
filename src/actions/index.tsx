import { Dispatch } from 'redux';
import { EActionType, ECartAction, AuthAction, CartAddAction, UserAuth, UserAuthData } from './types';

export const loginAction = (data: UserAuthData): AuthAction => {
  const action: AuthAction = {
    type: EActionType.LOGIN_SUCCESS,
    data,
  };
  return action;
};

export const loginFailAction = (): AuthAction => {
  const action: AuthAction = {
    type: EActionType.LOGIN_FAILED,
    data: null,
  };
  return action;
};

export const logoutAction = (): AuthAction => {
  const action: AuthAction = {
    type: EActionType.LOGOUT_SUCCESS,
    data: null,
  };
  return action;
};

export const addProductAction = (product: ProductData): CartAddAction => {
  const action: CartAddAction = {
    type: ECartAction.ADD_PRODUCT,
    product: { ...product, count: 1 },
  };
  return action;
};

export const loadData: any = () => (dispatch: Dispatch<AuthAction>, getState: () => UserAuth): any => {
  const url = new URL(`http://api.${window.location.host}/user`);
  const prevState = getState();

  const fetchFunc = (): void => {
    fetch(url.toString(), { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        return dispatch(loginAction(data));
      })
      .catch(() => {
        localStorage.removeItem('token');
        dispatch(loginFailAction());
      });
  };

  if (prevState.user) {
    const token = localStorage.getItem('token');
    if (token) {
      url.searchParams.append('api_token', token);
      fetchFunc();
    }
  }
};
