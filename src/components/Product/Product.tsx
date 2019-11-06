import * as React from "react";

import "./Product.scss";

import {Rate} from "../Rate/Rate";
import {FavoriteButton} from "../FavoriteButton/FavoriteButton";
import {Button} from "../Button/Button";
import {Link} from "react-router-dom";
import {ICartAction, IRootReducer} from "../../actions/types";
import {Dispatch} from "redux";
import {addProductAction} from "../../actions";
import {connect} from "react-redux";

interface IProductProps {
    data:IProduct,
    onClickFavorite?:(id:number)=>void,
    linked?: boolean
}

interface IStateProps{
}

interface IDispatchProps{
    addProduct: (product: IProduct)=>void,
}

type Props = IProductProps & IStateProps & IDispatchProps;

class Product extends React.Component<Props, {}> {
    static defaultProps = {
        linked: true
    };
    constructor(props:Props) {
        super(props);

        this.onClickAdd = this.onClickAdd.bind(this);
        this.handlerFavoriteClick = this.handlerFavoriteClick.bind(this);
    }
    onClickAdd(){
        let product = {...this.props.data};
        this.props.addProduct(product);
    }
    handlerFavoriteClick(){
        if (this.props.onClickFavorite){
            this.props.onClickFavorite(this.props.data.id);
        }
    }
    showLinked(child:JSX.Element){

        if (this.props.linked){
            return (
                <Link to={"/tea/" + this.props.data.id}> {child} </Link>
            );
        }else{
            return child;
        }
    }
    render() {
        return (
            <section className="product">
                <h2><Link to={"/tea/" + this.props.data.id}>{this.props.data.title}</Link></h2>
                <div className="product__rate">
                    <Rate name={"rate"+this.props.data.id} rating={this.props.data.rating} disabled={true}/>
                </div>
                {this.showLinked(
                        <div className="product__image-wrapper">
                            <img className="product__image" src={this.props.data.image} alt={this.props.data.title}/>
                            {!!this.props.data.discount &&
                            <div className="product__discount">-{this.props.data.discount}%</div>
                            }
                        </div>
                )}
                <div className="product__info-interface">
                    <div className="product__info">
                        <div className="product__weight">50г</div>
                        <div className="product__price">
                            <div className={"product__price-main" + (this.props.data.discount ? " product__price-main_crossed" : "")}>{this.props.data.price}р</div>
                            {!!this.props.data.discount &&
                            <div className="product__price-discount">
                                {this.props.data.price * (100 - this.props.data.discount) / 100}р
                            </div>
                            }
                        </div>
                    </div>
                    <div className="product__interface">
                        <div className="product__favoriteButton">
                            <FavoriteButton onClick={this.handlerFavoriteClick} id={this.props.data.id} toggle={this.props.data.favorite}/>
                        </div>
                        <Button onClick={this.onClickAdd} text="В корзину"/>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps:(state:IRootReducer)=>IStateProps = (state)=>{
    return {
        isAuthenticated:state.auth.isAuthenticated
    }
};

const mapDispatchToProps:(dispatch:Dispatch<ICartAction>)=>IDispatchProps = (dispatch) => {
    return {
        addProduct: (product: IProduct) => dispatch(addProductAction(product)),
    }
};

export default connect<IStateProps, IDispatchProps, IProductProps>(mapStateToProps, mapDispatchToProps)(Product);