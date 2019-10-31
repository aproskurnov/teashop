import * as React from "react";

import "./FilterPanel.scss"

import {Slider} from "../Slider/Slider";
import {Checkbox} from "../Checkbox/Checkbox";
import {Button} from "../Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

interface IFilterPanelProps {
    filterPanelShow: boolean,
    onClosePanel:(e:React.MouseEvent<HTMLElement>)=>void,
    filter: IFilter
    onSliderChange:(value:number[])=>void,
    onLeftChange:(e:React.ChangeEvent<HTMLElement>)=>void,
    onRightChange:(e:React.ChangeEvent<HTMLElement>)=>void,
    onGreenChange:(e:React.ChangeEvent<HTMLElement>)=>void,
    onRedChange:(e:React.ChangeEvent<HTMLElement>)=>void,
    onWhiteChange:(e:React.ChangeEvent<HTMLElement>)=>void,
    onPuerChange:(e:React.ChangeEvent<HTMLElement>)=>void,
    onNewProductChange:(e:React.ChangeEvent<HTMLElement>)=>void,
    onDiscountChange:(e:React.ChangeEvent<HTMLElement>)=>void,
    onApplyClick:(e:React.MouseEvent<HTMLElement>)=>void,
}


export class FilterPanel extends React.Component<IFilterPanelProps, {}> {
    constructor(props: IFilterPanelProps){
        super(props);
    }
    render() {
        return (

            <aside className="filter-panel">
                <div className={"filter-panel__layout" + (this.props.filterPanelShow ? " filter-panel__layout_showed" : "")}/>
                <div className={"filter-panel__content"+ (this.props.filterPanelShow ? " filter-panel__content_showed" : "")}>
                    <Link to="#" onClick={this.props.onClosePanel}>
                        <FontAwesomeIcon className={"filter-panel__close"} icon={faTimes} size="2x" />
                    </Link>
                    <h3>Цена</h3>
                    <Slider
                        onLeftChange={this.props.onLeftChange}
                        onRightChange={this.props.onRightChange}
                        onSliderChange={this.props.onSliderChange}
                        value={this.props.filter.price}
                        min={this.props.filter.min}
                        max={this.props.filter.max}
                    />
                    <h3>Категории</h3>
                    <div className="filter-panel__checkbox-group">
                        <Checkbox onChangeCheckbox={this.props.onGreenChange} checked={this.props.filter.green} text="зеленый" name="green"/>
                        <Checkbox onChangeCheckbox={this.props.onRedChange} checked={this.props.filter.red} text="красный" name="red"/>
                        <Checkbox onChangeCheckbox={this.props.onWhiteChange} checked={this.props.filter.white} text="белый" name="white"/>
                        <Checkbox onChangeCheckbox={this.props.onPuerChange} checked={this.props.filter.puer} text="пуэр" name="puer"/>
                    </div>
                    <h3>Дополнительно</h3>
                    <div className="filter-panel__checkbox-group">
                        <Checkbox onChangeCheckbox={this.props.onNewProductChange} checked={this.props.filter.new_product} text="новинка" name="new_product"/>
                        <Checkbox onChangeCheckbox={this.props.onDiscountChange} checked={this.props.filter.discount} text="скидка" name="discount"/>
                    </div>
                    <div className="filter-panel__button">
                        <Button onClick={this.props.onApplyClick} text="Применить"/>
                    </div>
                </div>
            </aside>
        );
    }
}