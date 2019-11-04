import * as React from "react";

import "./Input.scss"

interface InputProps {
    placeholder?:string,
    type?:string,
    name?:string,
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    onBlur?:(e:React.FocusEvent<HTMLInputElement>)=>void,
    onKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void,
    defaultValue?:number,
    value?:string|number,
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
                   onBlur={this.props.onBlur}
                   value={this.props.value}
                   defaultValue={this.props.defaultValue}
                   name={this.props.name}
                   type={this.props.type}
                   placeholder={this.props.placeholder}/>
        );
    }
}