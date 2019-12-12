import * as React from 'react';
import { match as Match } from 'react-router-dom';

import './Tea.scss';

import Product from '../../Product/Product';
import Header from '../../Header/Header';

interface TeaMatch {
  id: string;
}

interface TeaProps {
  match: Match<TeaMatch>;
}

interface TeaState {
  product: ProductData;
}

class Tea extends React.Component<TeaProps, TeaState> {
  constructor(props: TeaProps) {
    super(props);

    const product: ProductData = {
      id: 0,
      title: '',
      description: '',
      discount: 0,
      price: 0,
      new_product: false,
      favorite: false,
      image: '',
      rating: 0,
      category: { id: 0, title: '' },
    };
    this.state = { product };
  }

  componentDidMount(): void {
    const { match } = this.props;
    const url = new URL(`http://api.${window.location.host}/tea/${match.params.id}`);
    fetch(url.toString(), { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        this.setState({ product: data });
        return null;
      })
      .catch(e => {
        throw new Error(e);
      });
  }

  render(): React.ReactNode {
    const { product } = this.state;
    return (
      <div className="container container_big">
        <Header filterPanel={false} />
        <div className="tea">
          <Product linked={false} data={product} />
          <div className="tea__description">{product.description}</div>
        </div>
      </div>
    );
  }
}

export default Tea;
