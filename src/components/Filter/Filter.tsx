import * as React from "react";

import {Search} from "../Search/Search";
import {Product} from "../Product/Product";

export class Filter extends React.Component<{}, {products:IProduct[]}> {
    constructor(props:Filter){
        super(props);
        this.state = {products:[]};
    }
    componentDidMount() {
        fetch('http://api.' + window.location.host + '/tea', {mode:'cors'})
            .then(response=>response.json())
            .then(data=>{
                this.setState({products:data});
            });
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
                <Search/>
                <div className="filter__products">
                    {this.createProducts()}
                </div>
            </div>
        );
    }
}