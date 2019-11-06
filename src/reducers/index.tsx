import {combineReducers} from 'redux';
import {authReducer} from "./authReducer";
import {cartReducer} from "./cartReducer";

const reducer = combineReducers({
    auth: authReducer,
    cart: cartReducer
});

export default reducer;