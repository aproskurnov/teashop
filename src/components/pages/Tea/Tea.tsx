import Product from "../../Product/Product";
import * as React from "react";

import "./Tea.scss";

import Header from "../../Header/Header";

import {match} from "react-router-dom";

interface ITeaMatch{
    id: string
}

interface ITeaProps{
    match: match<ITeaMatch>
}

interface ITeaState {
    product: IProduct
}

export class Tea extends React.Component<ITeaProps, ITeaState> {
    constructor(props: ITeaProps) {
        super(props);

        let product:IProduct = {
            id: 0,
            title: "",
            description: "",
            discount: 0,
            price: 0,
            new_product: false,
            favorite: false,
            image: "",
            rating: 0,
            category: {id:0, title: ""}
        };
        this.state = {product};
    }


    componentDidMount () {
        let url = new URL('http://api.' + window.location.host + '/tea/' + this.props.match.params.id);
        fetch(url.toString(), {mode:'cors'})
            .then(response=>response.json())
            .then(data=>{
                this.setState({product: data})
            });
    }

    render() {
        return (
            <div className="container container_big">
                <Header filterPanel={false}/>
                <div className="tea">
                    <Product linked={false} data={this.state.product}/>
                    <div className="tea__description">{this.state.product.description}</div>
                </div>
            </div>
        );
    }
}