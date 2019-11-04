import * as React from "react";

import "./Input.scss"

import MaskedInput, {maskArray} from 'react-text-mask';

interface InputProps {
    placeholder?:string,
    type?:string,
    name?:string,
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    onBlur?:(e:React.FocusEvent<HTMLInputElement>)=>void,
    onKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void,
    defaultValue?:number,
    value?:string|number,
    centered?:boolean,
    mask?:maskArray | ((value: string) => maskArray)
}

export class Input extends React.Component<InputProps, {}> {
    constructor(props:InputProps) {
        super(props);
    }
    static defaultProps = {
        type:"text",
        centered: false
    };

    renderInput(){
        if(this.props.mask){
            return (
                <MaskedInput className={"input__field" + (this.props.centered ? " input__field_centered" : "")}
                       mask={this.props.mask}
                       onKeyDown={this.props.onKeyDown}
                       onChange={this.props.onChange}
                       onBlur={this.props.onBlur}
                       value={this.props.value}
                       defaultValue={this.props.defaultValue}
                       name={this.props.name}
                       type={this.props.type}
                       placeholder={this.props.placeholder}/>
            );
        }else{
            return (
                <input className={"input__field" + (this.props.centered ? " input__field_centered" : "")}
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
    render() {
        return (
            <div className={"input"}>
                {this.renderInput()}
            </div>
        );
    }
}