import * as React from "react";

import "./Input.scss"

interface InputProps {
    placeholder?:string
}

export class Input extends React.Component<InputProps, {}> {
    constructor(props:InputProps) {
        super(props);
    }

    render() {
        return (
            <input className="input" type="text" placeholder={this.props.placeholder}/>
        );
    }
}