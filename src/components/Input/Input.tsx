import * as React from "react";

import "./Input.scss"
import {ChangeEvent} from "react";

interface InputProps {
    placeholder?:string,
    type?:string,
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void,
    onKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void,
    defaultValue?:number,
    value?:number,
    centered?:boolean
}

export class Input extends React.Component<InputProps, {}> {
    constructor(props:InputProps) {
        super(props);
    }
    static defaultProps = {
        type:"text",
        centered: false
    };

    render() {
        return (
            <input className={"input" + (this.props.centered ? " input_centered" : "")}
                   onKeyDown={this.props.onKeyDown}
                   onChange={this.props.onChange}
                   value={this.props.value}
                   defaultValue={this.props.defaultValue}
                   type={this.props.type}
                   placeholder={this.props.placeholder}/>
        );
    }
}