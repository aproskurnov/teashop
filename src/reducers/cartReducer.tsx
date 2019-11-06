import {IProductReducerState, ECartAction, ICartAction, ICartAddAction, ICartProduct, ICartManipulateAction, ICartLoadAction} from "../actions/types";


const initialState: IProductReducerState = {
    products: []
};

export const cartReducer = ( state = initialState, action:ICartAction )=>{

    switch (action.type) {
        case ECartAction.ADD_PRODUCT:
            let hasProduct = false;
            let products = state.products.map(v=>{
                if ((action as ICartAddAction).product.id === v.id){
                    ++v.count;
                    hasProduct = true;
                }
                return v;
            });
            if (!hasProduct){
                products.push((action as ICartAddAction).product);
            }
            return {
                ...state,
                products: products
            };
        case ECartAction.REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((v:ICartProduct)=>((action as ICartManipulateAction).id !== v.id))
            };
        case ECartAction.INCREMENT_PRODUCT:
            return {
                ...state,
                products: state.products.map((v:ICartProduct)=>{
                    if ((action as ICartManipulateAction).id === v.id){
                        ++v.count;
                    }
                    return v;
                })
            };
        case ECartAction.DECREMENT_PRODUCT:
            return {
                ...state,
                products: state.products.map(v=>{
                    if ((action as ICartManipulateAction).id === v.id){
                        --v.count;
                        if (v.count !== 0){
                            return v;
                        }
                    }
                })
            };
        case ECartAction.CLEAR_CART:
            return{
                ...state,
                products: []
            };
        case ECartAction.LOAD_CART:
            return{
                ...state,
                products: (action as ICartLoadAction).data
            };
        default:
            return state;

    }
};