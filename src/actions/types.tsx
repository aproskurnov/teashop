export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  email: string;
  phone: string;
  name: string;
}

export interface UserAuth {
  token: string;
  isAuthenticated: boolean;
  user: User;
}

export interface UserAuthData {
  token: string;
  user: User;
}

export interface AuthAction {
  type: EActionType;
  data: UserAuthData;
}

export enum EActionType {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
}

export interface CartProduct {
  id: number;
  count: number;
  title: string;
  rating: number;
  image: string;
  price: number;
  favorite: boolean;
}

export enum ECartAction {
  ADD_PRODUCT = 'ADD_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  INCREMENT_PRODUCT = 'INCREMENT_PRODUCT',
  DECREMENT_PRODUCT = 'DECREMENT_PRODUCT',
  CLEAR_CART = 'CLEAR_CART',
  LOAD_CART = 'LOAD_CART',
}

export interface ProductReducerState {
  products: CartProduct[];
}

export interface CartAddAction {
  type: ECartAction;
  product: CartProduct;
}
export interface CartManipulateAction {
  type: ECartAction;
  id: number;
}
export interface CartLoadAction {
  type: ECartAction;
  data: CartProduct[];
}
export interface CartOtherAction {
  type: ECartAction;
}
export type CartAction = CartAddAction | CartManipulateAction | CartLoadAction | CartOtherAction;

export type AnyActionType = EActionType | ECartAction;

export interface RootReducer {
  auth: UserAuth;
  cart: ProductReducerState;
}
