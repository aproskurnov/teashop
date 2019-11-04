import {EActionType, IAuthAction, IUserAuthData} from "./types"
import {Dispatch} from "redux";


export const loadData:any = () => (dispatch:Dispatch<IAuthAction>) => {
    let url = new URL('http://api.' + window.location.host + '/user');
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

    let token = localStorage.getItem('token');
    if (token){
        url.searchParams.append('api_token', token);
        fetchFunc();
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
