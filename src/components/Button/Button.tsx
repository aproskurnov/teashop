import * as React from "react";

import "./Button.scss";

interface ButtonProps {
    text?: string;
}

export class Button extends React.Component<ButtonProps, {}> {
    render() {
        return (
            <button className="button">{this.props.text}</button>
        );
    }
}