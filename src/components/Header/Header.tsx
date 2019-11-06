import * as React from "react";
import './Header.scss';

import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import logo from "./logo.png";
import {ICartAction, IRootReducer} from "../../actions/types";
import {Dispatch} from "redux";
import {connect} from "react-redux";

interface IHeaderProps {
    onFilterClick?:(e:React.MouseEvent<HTMLElement>)=>void,
    filterPanel?:boolean
}
interface IStateProps{
    countProduct: number
}

interface IDispatchProps{
}

type Props = IHeaderProps & IStateProps & IDispatchProps;


class Header extends React.Component<Props, {}> {
    static defaultProps={
        filterPanel:true
    };
    constructor(props:Props){
        super(props);
    }
    showCount(){
        if (this.props.countProduct){
            return (
                <div className="header__count-product">{this.props.countProduct}</div>
            );
        }
    }
    render() {
        let filterPanelButton = null;
        if (this.props.filterPanel){
            filterPanelButton = (
                <div className="header__ico header__ico_filter">
                    <Link onClick={this.props.onFilterClick} to="#">
                        <FontAwesomeIcon icon={faCog} size="2x" />
                    </Link>
                </div>
            );
        }

        return (
            <header className="header">
                <Link to="/">
                    <img className="header__logo" src={logo} alt="TeaShop"/>
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
                    {filterPanelButton}
                    <div className="header__ico">
                        <Link to="/cart">
                            <div className="header__counter-wrapper">
                                {this.showCount()}
                            </div>
                            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                        </Link>
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps:(state:IRootReducer)=>IStateProps = (state)=>{
    let countProduct = 0;
    state.cart.products.map((v)=>{ countProduct += v.count; });
    return {
        countProduct:countProduct
    }
};

const mapDispatchToProps:(dispatch:Dispatch<ICartAction>)=>IDispatchProps = () => {
    return {

    }
};

export default connect<IStateProps, IDispatchProps, IHeaderProps>(mapStateToProps, mapDispatchToProps)(Header);