import * as React from "react";

import "./FavoriteButton.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

interface IFavoriteButtonProps{
    toggle?:boolean
}
interface FavoriteButtonStates {
    isToggleOn: boolean
}

export class FavoriteButton extends React.Component<IFavoriteButtonProps, FavoriteButtonStates> {
    constructor(props:IFavoriteButtonProps){
        super(props);
        this.state = {isToggleOn:props.toggle};
        this.handleClick = this.handleClick.bind(this);
    }
    static defaultProps = {
        toggle: false
    };
    handleClick(){
        this.setState((prevState)=> ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    render() {
        return (
            <button className="favorite-button" onClick={this.handleClick}>
                <FontAwesomeIcon icon={this.state.isToggleOn ?  faHeartSolid: faHeartRegular} size="2x" />
            </button>
        );
    }
}