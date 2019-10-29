import * as React from "react";

interface ButtonProps {
    text?: string;
}

export class Button extends React.Component<ButtonProps, {}> {
    render() {
        return (
            <button>{this.props.text}</button>
        );
    }
}