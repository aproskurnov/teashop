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