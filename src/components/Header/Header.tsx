import * as React from "react";
import './Header.scss';

import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import logo from "./logo.png";

export class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <Link to="/">
                    <img className="header__logo" src={logo} alt="TeaShop"/>
                </Link>
                <div className="header__interface">
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
                    <div className="header__ico">
                        <Link to="#">
                            <FontAwesomeIcon icon={faCog} size="2x" />
                        </Link>
                    </div>
                    <div className="header__ico">
                        <Link to="/cart">
                            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                        </Link>
                    </div>
                </div>
            </header>
        );
    }
}