import * as React from "react";

import "./Product.scss";

import {Rate} from "../Rate/Rate";
import {FavoriteButton} from "../FavoriteButton/FavoriteButton";
import {Button} from "../Button/Button";

interface ProductProps {
    data:IProduct
}

export class Product extends React.Component<ProductProps, {}> {
    constructor(props:ProductProps) {
        super(props);

    }

    render() {
        return (
            <section className="product">
                <h2>{this.props.data.title}</h2>
                <div className="product__rate">
                    <Rate name={"rate"+this.props.data.id} rating={this.props.data.rating} disabled={true}/>
                </div>
                <div className="product__image-wrapper">
                    <img className="product__image" src={this.props.data.image} alt={this.props.data.title}/>
                    {!!this.props.data.discount &&
                    <div className="product__discount">-{this.props.data.discount}%</div>
                    }
                </div>
                <div className="product__info-interface">
                    <div className="product__info">
                        <div className="product__weight">50г</div>
                        <div className="product__price">
                            <div className={"product__price-main" + (this.props.data.discount ? " product__price-main_crossed" : "")}>{this.props.data.price}р</div>
                            {!!this.props.data.discount &&
                            <div className="product__price-discount">
                                {this.props.data.price * this.props.data.discount / 100}р
                            </div>
                            }
                        </div>
                    </div>
                    <div className="product__interface">
                        <div className="product__favoriteButton">
                            <FavoriteButton toggle={this.props.data.favorite}/>
                        </div>
                        <Button text="В корзину"/>
                    </div>
                </div>
            </section>
        );
    }
}