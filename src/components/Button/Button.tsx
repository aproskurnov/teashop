import * as React from "react";

import "./Button.scss";

interface ButtonProps {
    text?: string,
    onClick?:(e:React.MouseEvent<HTMLElement>)=>void,
}

export class Button extends React.Component<ButtonProps, {}> {
    render() {
        return (
            <button onClick={this.props.onClick} className="button">{this.props.text}</button>
        );
    }
}