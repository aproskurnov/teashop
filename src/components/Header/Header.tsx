import * as React from "react";
import './Header.scss';

import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import logo from "./logo.png";

interface IHeaderProps {
    onFilterClick:(e:React.MouseEvent<HTMLElement>)=>void
}

export class Header extends React.Component<IHeaderProps, {}> {
    constructor(props:IHeaderProps){
        super(props);
    }
    render() {
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
                    <div className="header__ico header__ico_filter">
                        <Link onClick={this.props.onFilterClick} to="#">
                            <FontAwesomeIcon icon={faCog} size="2x" />
                        </Link>
                    </div>
                    <div className="header__ico">
                        <Link to="/cart">
                            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                        </Link>
                    </div>
                </nav>
            </header>
        );
    }
}