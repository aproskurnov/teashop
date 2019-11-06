export interface ILoginData {
    email: string,
    password: string
}

export interface IUser{
    email: string,
    phone: string,
    name: string
}

export interface IUserAuth {
    token: string,
    isAuthenticated: boolean,
    user: IUser
}

export interface IUserAuthData {
    token: string,
    user: IUser
}

export interface IAuthAction {
    type: EActionType,
    data: IUserAuthData
}

export enum EActionType {
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    LOGIN_FAILED = "LOGIN_FAILED",
    REGISTER_SUCCESS = "REGISTER_SUCCESS"
}

export interface ICartProduct{
    id: number,
    count: number,
    title: string,
    rating: number,
    image: string,
    price: number,
    favorite: boolean
}

export enum ECartAction {
    ADD_PRODUCT = "ADD_PRODUCT",
    REMOVE_PRODUCT = "REMOVE_PRODUCT",
    INCREMENT_PRODUCT = "INCREMENT_PRODUCT",
    DECREMENT_PRODUCT = "DECREMENT_PRODUCT",
    CLEAR_CART = "CLEAR_CART",
    LOAD_CART = "LOAD_CART"
}

export interface IProductReducerState {
    products: ICartProduct[],
}

export interface ICartAddAction{
    type: ECartAction,
    product: ICartProduct,
}
export interface ICartManipulateAction{
    type: ECartAction,
    id: number,
}
export interface ICartLoadAction{
    type: ECartAction,
    data: ICartProduct[]
}
export interface ICartOtherAction {
    type: ECartAction
}
export type ICartAction = ICartAddAction | ICartManipulateAction | ICartLoadAction | ICartOtherAction;

export type AnyActionType = EActionType | ECartAction;

export interface IRootReducer {
    auth: IUserAuth,
    cart: IProductReducerState
}