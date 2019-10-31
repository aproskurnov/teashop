import * as React from "react";

import {Input} from "../Input/Input";

interface ISearchProps{
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    onPressEnter:(e:React.KeyboardEvent<HTMLInputElement>)=>void
}

export class Search extends React.Component<ISearchProps, {}> {
    constructor(props:ISearchProps){
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    onKeyDown(e:React.KeyboardEvent<HTMLInputElement>){
        if (e.key === 'Enter'){
            this.props.onPressEnter(e);
        }
    }
    render() {
        return (
            <div className="search">
                <Input onKeyDown={this.onKeyDown} onChange={this.props.onChange} placeholder="Найти..."/>
            </div>
        );
    }
}