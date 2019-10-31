import * as React from "react";

import "./Checkbox.scss"

interface ICheckboxProps {
    text:string,
    name: string,
    checked?: boolean,
    onChangeCheckbox?:(e:React.ChangeEvent<HTMLElement>)=>void,
}

interface ICheckboxState {
    isChecked: boolean
}

export class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
    static defaultProps = {
        checked: false
    };
    constructor(props:ICheckboxProps){
        super(props);
    }
    onChange(){
        this.setState(prevState=>{!prevState.isChecked})
    }
    render() {
        return (
            <div className="checkbox">
                <label className="checkbox__content">
                    <input className="checkbox__input" onChange={this.props.onChangeCheckbox} type="checkbox" name={this.props.name} checked={this.props.checked}/>
                    <div className="checkbox__element"/>
                    <div className="checkbox__label">{this.props.text}</div>
                </label>
            </div>
        );
    }
}