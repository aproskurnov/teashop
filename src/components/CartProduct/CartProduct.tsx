import * as React from 'react';

// import './CartProduct.scss';

import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Rate from '../Rate/Rate';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { CartAction, RootReducer, CartAddAction } from '../../actions/types';
import { addProductAction } from '../../actions';

interface CartProductProps {
  data: ProductData;
  count: number;
}

interface DispatchProps {
  addProduct: (product: ProductData) => void;
}

type Props = CartProductProps & DispatchProps;

const CartProduct: React.FunctionComponent<Props> = ({ data }) => {
  const showLinked = (child: JSX.Element): JSX.Element => {
    return <Link to={`/tea/${data.id}`}> {child} </Link>;
  };

  const calculateDiscount = (): number => {
    return (data.price * (100 - data.discount)) / 100;
  };

  return (
    <section className="product">
      <h2>
        <Link to={`/tea/${data.id}`}>{data.title}</Link>
      </h2>
      <div className="product__rate">
        <Rate name={`rate${data.id}`} rating={data.rating} disabled />
      </div>
      {showLinked(
        <div className="product__image-wrapper">
          <img className="product__image" src={data.image} alt={data.title} />
          {!!data.discount && <div className="product__discount">-{data.discount}%</div>}
        </div>,
      )}
      <div className="product__info-interface">
        <div className="product__info">
          <div className="product__weight">50г</div>
          <div className="product__price">
            <div className={`product__price-main${data.discount ? ' product__price-main_crossed' : ''}`}>
              {data.price}р
            </div>
            {!!data.discount && <div className="product__price-discount">{calculateDiscount()}р</div>}
          </div>
        </div>
        <div className="product__interface">
          <div className="product__favoriteButton">
            <FavoriteButton id={data.id} toggle={data.favorite} />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps: (state: RootReducer) => {} = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps: (dispatch: Dispatch<CartAction>) => DispatchProps = dispatch => {
  return {
    addProduct: (product: ProductData): CartAddAction => dispatch(addProductAction(product)),
  };
};

export default connect<{}, DispatchProps, CartProductProps>(mapStateToProps, mapDispatchToProps)(CartProduct);
