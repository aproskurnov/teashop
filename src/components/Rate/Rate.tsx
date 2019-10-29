import * as React from "react";

import "./Rate.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";

interface IRateProps {
    name:string,
    rating:number,
    disabled?:boolean,
}

export class Rate extends React.Component<IRateProps, {}> {
    constructor(props:IRateProps){
        super(props)
    }
    static defaultProps = {
        disabled: false,
    };
    render() {
        return (
            <div className="rate">
                <input className="rate__input" type="radio" value="1"
                       checked={this.props.rating==1} disabled={this.props.disabled}
                       id={this.props.name + "-star-1"}
                />
                <label className="rate__element" htmlFor={this.props.name + "-star-1"}>
                    <FontAwesomeIcon icon={this.props.rating >= 1 || (!this.props.rating && this.props.disabled) ? faStarSolid : faStarRegular} size="1x" />
                </label>
                <input className="rate__input" type="radio" value="2"
                       checked={this.props.rating==2} disabled={this.props.disabled}
                       id={this.props.name + "-star-2"}
                />
                <label className="rate__element" htmlFor={this.props.name + "-star-2"}>
                    <FontAwesomeIcon icon={this.props.rating >= 2 || (!this.props.rating && this.props.disabled) ? faStarSolid : faStarRegular} size="1x" />
                </label>
                <input className="rate__input" type="radio" value="3"
                       checked={this.props.rating==3} disabled={this.props.disabled}
                       id={this.props.name + "-star-3"}
                />
                <label className="rate__element" htmlFor={this.props.name + "-star-3"}>
                    <FontAwesomeIcon icon={this.props.rating >= 3 || (!this.props.rating && this.props.disabled) ? faStarSolid : faStarRegular} size="1x" />
                </label>
                <input className="rate__input" type="radio" value="4"
                       checked={this.props.rating==4} disabled={this.props.disabled}
                       id={this.props.name + "-star-4"}
                />
                <label className="rate__element" htmlFor={this.props.name + "-star-4"}>
                    <FontAwesomeIcon icon={this.props.rating >= 4  || (!this.props.rating && this.props.disabled)? faStarSolid : faStarRegular} size="1x" />
                </label>
                <input className="rate__input" type="radio" value="5"
                       checked={this.props.rating==5} disabled={this.props.disabled}
                       id={this.props.name + "-star-5"}
                />
                <label className="rate__element" htmlFor={this.props.name + "-star-5"}>
                    <FontAwesomeIcon icon={this.props.rating >= 5 || (!this.props.rating && this.props.disabled) ? faStarSolid : faStarRegular} size="1x" />
                </label>
            </div>
        );
    }
}