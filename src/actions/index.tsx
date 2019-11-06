import {EActionType, ECartAction, IAuthAction, ICartAddAction, IUserAuth, IUserAuthData} from "./types"
import {Dispatch} from "redux";


export const loadData:any = () => (dispatch:Dispatch<IAuthAction>, getState:()=>IUserAuth) => {
    let url = new URL('http://api.' + window.location.host + '/user');
    let data = getState();

    let fetchFunc = ()=>{
        fetch(url.toString(), {mode:'cors'})
            .then(response=>response.json())
            .then(data=>{
                dispatch(loginAction(data));
            }).catch(()=> {
                localStorage.removeItem('token');
                dispatch(loginFailAction());
            }
        );
    };

    if (data.user) {
        let token = localStorage.getItem('token');
        if (token) {
            url.searchParams.append('api_token', token);
            fetchFunc();
        }
    }

};

export const loginAction = (data:IUserAuthData) => {
    let action:IAuthAction = {
        type: EActionType.LOGIN_SUCCESS,
        data: data
    };
    return action;
};

export const loginFailAction = () => {
    let action:IAuthAction = {
            type: EActionType.LOGIN_FAILED,
            data: null
        };
    return action;
};

export const logoutAction = () => {
    let action:IAuthAction = {
        type: EActionType.LOGOUT_SUCCESS,
        data: null
    };
    return action;
};

export const addProductAction = (product: IProduct) => {
    let action:ICartAddAction = {
        type: ECartAction.ADD_PRODUCT,
        product: {...product, count:1}
    };
    return action;
};