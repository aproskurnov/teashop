import * as React from 'react';
import './Header.scss';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser, faCog, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import logo from './logo.png';
import { CartAction, RootReducer } from '../../actions/types';

interface HeaderProps {
  onFilterClick?: (e: React.MouseEvent<HTMLElement>) => void;
  filterPanel?: boolean;
}
interface StateProps {
  countProduct: number;
}

type Props = HeaderProps & StateProps;

const Header: React.FunctionComponent<Props> = ({ countProduct, filterPanel, onFilterClick }) => {
  const showCount = (): JSX.Element => {
    if (countProduct) {
      return <div className="header__count-product">{countProduct}</div>;
    }
    return null;
  };

  const showPanelButton = (): JSX.Element => {
    if (filterPanel) {
      return (
        <div className="header__ico header__ico_filter">
          <Link onClick={onFilterClick} to="/unused">
            <FontAwesomeIcon icon={faCog} size="2x" />
          </Link>
        </div>
      );
    }
    return null;
  };
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="TeaShop" />
      </Link>
      <nav className="header__interface">
        <div className="header__ico">
          <Link to="/favorite">
            <FontAwesomeIcon icon={faHeart} size="2x" />
          </Link>
        </div>
        <div className="header__ico">
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} size="2x" />
          </Link>
        </div>
        {showPanelButton()}
        <div className="header__ico">
          <Link to="/cart">
            <div className="header__counter-wrapper">{showCount()}</div>
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

Header.defaultProps = {
  filterPanel: true,
};

const mapStateToProps: (state: RootReducer) => StateProps = state => {
  let countProduct = 0;
  state.cart.products.forEach(v => {
    countProduct += v.count;
  });
  return {
    countProduct,
  };
};

const mapDispatchToProps: (dispatch: Dispatch<CartAction>) => {} = () => {
  return {};
};

export default connect<StateProps, {}, HeaderProps>(mapStateToProps, mapDispatchToProps)(Header);
