import * as React from "react";

import {Range} from "rc-slider";

import "rc-slider/assets/index.css";
import "./Slider.scss";

import {Input} from "../Input/Input";

interface ISliderProps{
    value:number[],
    min: number,
    max:number,
    onSliderChange:(value:number[])=>void,
    onLeftChange:(e:React.ChangeEvent<HTMLElement>)=>void,
    onRightChange:(e:React.ChangeEvent<HTMLElement>)=>void,
}

export class Slider extends React.Component<ISliderProps, {}> {
    constructor(props:ISliderProps){
        super(props);
    }

    render() {
        return (
            <div className="slider">
                <div className="slider__inputs">
                    <Input type={"number"} centered={true} value={this.props.value[0]} onChange={this.props.onLeftChange}/>
                    <Input type={"number"} centered={true} value={this.props.value[1]} onChange={this.props.onRightChange}/>
                </div>
                <div className="slider__slider">
                    <Range onChange={this.props.onSliderChange} value={this.props.value} min={this.props.min} max={this.props.max} />
                </div>
            </div>
        );
    }
}