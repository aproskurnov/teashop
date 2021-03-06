import * as React from 'react';

import './Product.scss';

import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Rate from '../Rate/Rate';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { Button } from '../Button/Button';
import { CartAction, RootReducer, CartAddAction } from '../../actions/types';
import { addProductAction } from '../../actions';

interface ProductProps {
  data: ProductData;
  onClickFavorite?: (id: number) => void;
  linked?: boolean;
}

interface DispatchProps {
  addProduct: (product: ProductData) => void;
}

type Props = ProductProps & DispatchProps;

const Product: React.FunctionComponent<Props> = ({ data, onClickFavorite, linked, addProduct }: Props) => {
  const onClickAdd = (): void => {
    const product = { ...data };
    addProduct(product);
  };

  const handlerFavoriteClick = (): void => {
    if (onClickFavorite) {
      onClickFavorite(data.id);
    }
  };

  const showLinked = (child: JSX.Element): JSX.Element => {
    if (linked) {
      return <Link to={`/tea/${data.id}`}> {child} </Link>;
    }
    return child;
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
            <FavoriteButton onClick={handlerFavoriteClick} id={data.id} toggle={data.favorite} />
          </div>
          <Button onClick={onClickAdd} text="В корзину" />
        </div>
      </div>
    </section>
  );
};

Product.defaultProps = {
  linked: true,
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

export default connect<{}, DispatchProps, ProductProps>(mapStateToProps, mapDispatchToProps)(Product);
