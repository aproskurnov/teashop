import {
  IProductReducerState,
  ECartAction,
  ICartAction,
  ICartAddAction,
  ICartProduct,
  ICartManipulateAction,
  ICartLoadAction,
} from '../actions/types';

const initialState: IProductReducerState = {
  products: [],
};

const cartReducer = (state = initialState, action: ICartAction): IProductReducerState => {
  switch (action.type) {
    case ECartAction.ADD_PRODUCT: {
      let hasProduct = false;
      const products = state.products.map(v => {
        const el = { ...v };
        if ((action as ICartAddAction).product.id === v.id) {
          el.count += 1;
          hasProduct = true;
        }
        return el;
      });
      if (!hasProduct) {
        products.push((action as ICartAddAction).product);
      }
      return {
        ...state,
        products,
      };
    }
    case ECartAction.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((v: ICartProduct) => (action as ICartManipulateAction).id !== v.id),
      };
    case ECartAction.INCREMENT_PRODUCT:
      return {
        ...state,
        products: state.products.map((v: ICartProduct) => {
          const el = { ...v };
          if ((action as ICartManipulateAction).id === v.id) {
            el.count += 1;
          }
          return el;
        }),
      };
    case ECartAction.DECREMENT_PRODUCT:
      return {
        ...state,
        products: state.products.map(v => {
          const el = { ...v };
          if ((action as ICartManipulateAction).id === v.id) {
            el.count -= 1;
          }
          return el;
        }),
      };
    case ECartAction.CLEAR_CART:
      return {
        ...state,
        products: [],
      };
    case ECartAction.LOAD_CART:
      return {
        ...state,
        products: (action as ICartLoadAction).data,
      };
    default:
      return state;
  }
};

export default cartReducer;
