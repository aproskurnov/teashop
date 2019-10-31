import * as React from "react";

import "./Filter.scss";

import {Search} from "../Search/Search";
import {Product} from "../Product/Product";
import {FilterPanel} from "../FilterPanel/FilterPanel";

interface IFilterProps {
    filterPanelShow: boolean,
    onClosePanel:(e:React.MouseEvent<HTMLElement>)=>void,
}

interface IFilterState {
    filter: IFilter,
    products: IProduct[]
}

type TFilterCheckboxes = "green"|"red"|"white"|"puer"|"new_product"|"discount";

export class Filter extends React.Component<IFilterProps, IFilterState> {
    private filter:IFilter;
    constructor(props:IFilterProps){
        super(props);
        this.filter = {
            green: false,
            red: false,
            white: false,
            puer: false,
            price: [],
            min: 0,
            max: 50,
            new_product: false,
            discount: false,
            search: "",
        };

        this.state = {
            filter: {...this.filter, price:[0, 50]},
            products:[]
        };

        this.onSliderChange=this.onSliderChange.bind(this);
        this.onLeftChange=this.onLeftChange.bind(this);
        this.onRightChange=this.onRightChange.bind(this);
        this.onClosePanel=this.onClosePanel.bind(this);
        this.onSearchChange=this.onSearchChange.bind(this);
        this.onGreenChange=this.onGreenChange.bind(this);
        this.onRedChange=this.onRedChange.bind(this);
        this.onWhiteChange=this.onWhiteChange.bind(this);
        this.onPuerChange=this.onPuerChange.bind(this);
        this.onNewProductChange=this.onNewProductChange.bind(this);
        this.onDiscountChange=this.onDiscountChange.bind(this);
        this.onApplyClick=this.onApplyClick.bind(this);
        this.applyFilter=this.applyFilter.bind(this);

    }
    componentDidMount() {
        this.updateData();
    }
    updateData(){
        let url = new URL('http://api.' + window.location.host + '/tea');
        let params = {
            search:this.filter.search,
            green: +this.filter.green,
            red: +this.filter.red,
            white: +this.filter.white,
            puer: +this.filter.puer,
            new_product: +this.filter.new_product,
            discount: +this.filter.discount,
        };
        (Object.keys(params)  as Array<keyof typeof params>).forEach((key)=>{
            url.searchParams.append(key, params[key].toString());
        });

        if (this.filter.price.length){
            url.searchParams.append("price[]", this.filter.price[0].toString());
            url.searchParams.append("price[]", this.filter.price[1].toString());
        }

        fetch(url.toString(), {mode:'cors'})
            .then(response=>response.json())
            .then(data=>{
                this.updateFilter(data);
            });
    }
    updateFilter(data:IProductResp){
        if (!this.filter.price.length){
            this.filter.price = [data.price.min, data.price.max];
        }

        this.filter.min = data.price.min;
        this.filter.max = data.price.max;

        this.setState(()=>{
            return {filter:{...this.filter}, products:data.data};
        });
    }
    onSliderChange = (value:number[]) => {
        this.setState((prevState)=>{
            let filter:IFilter = prevState.filter;
            filter.price = value;
            return {filter:filter}
        });
    };
    onLeftChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        this.setState((prevState)=>{
            let filter = prevState.filter;
            filter.price = [value, prevState.filter.price[1]];
            return {filter: filter}
        });
    };
    onRightChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        this.setState((prevState)=> {
            let filter = prevState.filter;
            filter.price = [prevState.filter.price[0], value];
            return {filter: filter}
        });
    };
    onClosePanel = (e:React.MouseEvent<HTMLElement>)=>{
        this.setState(()=>({filter:{...this.filter, price: this.filter.price}}));
        this.props.onClosePanel(e);
    };
    onSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.filter.search = e.target.value;
    };
    onGreenChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setFilterCheckboxState("green", e.target.checked);
    };
    onRedChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setFilterCheckboxState("red", e.target.checked);
    };
    onWhiteChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setFilterCheckboxState("white", e.target.checked);
    };
    onPuerChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setFilterCheckboxState("puer", e.target.checked);
    };
    onNewProductChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setFilterCheckboxState("new_product", e.target.checked);
    };
    onDiscountChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setFilterCheckboxState("discount", e.target.checked);
    };
    private setFilterCheckboxState(prop:TFilterCheckboxes, checked:boolean){
        this.setState((prevState)=>({filter: {...prevState.filter,[prop]:checked}}))
    }
    onApplyClick(e:React.MouseEvent<HTMLElement>){
        this.applyFilter();
        this.props.onClosePanel(e);
    }
    applyFilter(){
        this.filter = {...this.state.filter, price:this.state.filter.price, search:this.filter.search};
        this.updateData();
    }
    createProducts(){
        let products:JSX.Element[] = [];
            this.state.products.map((v)=>{
                let product = (
                    <Product key={v.id} data={v}/>
                );
                products.push(product);
            });
        return products;
    }
    render() {
        return (
            <div className="filter">
                <div className="filter__panel">
                    <FilterPanel
                        onGreenChange={this.onGreenChange}
                        onRedChange={this.onRedChange}
                        onWhiteChange={this.onWhiteChange}
                        onPuerChange={this.onPuerChange}
                        onNewProductChange={this.onNewProductChange}
                        onDiscountChange={this.onDiscountChange}
                        onLeftChange={this.onLeftChange}
                        onRightChange={this.onRightChange}
                        onSliderChange={this.onSliderChange}
                        onApplyClick={this.onApplyClick}
                        filter={this.state.filter}
                        onClosePanel={this.onClosePanel}
                        filterPanelShow={this.props.filterPanelShow}
                    />
                </div>
                <div className="filter__content">
                <Search onPressEnter={this.applyFilter} onChange={this.onSearchChange}/>
                    <div className="filter__products">
                        {this.createProducts()}
                    </div>
                </div>
            </div>
        );
    }
}