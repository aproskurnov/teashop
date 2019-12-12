import * as React from 'react';

import './Filter.scss';

import Search from '../Search/Search';
import Product from '../Product/Product';
import FilterPanel from '../FilterPanel/FilterPanel';

interface FilterProps {
  filterPanelShow: boolean;
  onClosePanel: (e: React.MouseEvent<HTMLElement>) => void;
  favorite?: boolean;
}

interface FilterState {
  filter: FilterData;
  products: ProductData[];
}

type TFilterCheckboxes = 'green' | 'red' | 'white' | 'puer' | 'new_product' | 'discount';

export class Filter extends React.Component<FilterProps, FilterState> {
  private filter: FilterData;

  constructor(props: FilterProps) {
    super(props);
    this.filter = {
      green: false,
      red: false,
      white: false,
      puer: false,
      price: [],
      min: 0,
      max: 0,
      new_product: false,
      discount: false,
      search: '',
    };

    this.state = {
      filter: { ...this.filter, price: [0, 0] },
      products: [],
    };
  }

  componentDidMount = (): void => {
    this.updateData();
  };

  onGreenChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setFilterCheckboxState('green', e.target.checked);
  };

  onSliderChange = (value: number[]): void => {
    this.setState(prevState => {
      const { filter } = prevState;
      filter.price = value;
      return { filter };
    });
  };

  onLeftChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value;
    this.setState(prevState => {
      const { filter } = prevState;
      filter.price = [value, prevState.filter.price[1]];
      return { filter };
    });
  };

  onRightChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value;
    this.setState(prevState => {
      const { filter } = prevState;
      filter.price = [prevState.filter.price[0], value];
      return { filter };
    });
  };

  onClosePanel = (e: React.MouseEvent<HTMLElement>): void => {
    const { onClosePanel } = this.props;
    this.setState(() => ({ filter: { ...this.filter, price: this.filter.price } }));
    onClosePanel(e);
  };

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.filter.search = e.target.value;
  };

  onRedChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setFilterCheckboxState('red', e.target.checked);
  };

  onWhiteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setFilterCheckboxState('white', e.target.checked);
  };

  onPuerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setFilterCheckboxState('puer', e.target.checked);
  };

  onNewProductChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setFilterCheckboxState('new_product', e.target.checked);
  };

  onDiscountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setFilterCheckboxState('discount', e.target.checked);
  };

  onApplyClick = (e: React.MouseEvent<HTMLElement>): void => {
    const { onClosePanel } = this.props;
    this.applyFilter();
    onClosePanel(e);
  };

  onClickFavorite = (id: number): void => {
    const { favorite } = this.props;
    if (favorite) {
      this.setState(prevState => {
        const products = prevState.products.filter(v => {
          return v.id !== id;
        });
        return { products };
      });
    }
  };

  private setFilterCheckboxState = (prop: TFilterCheckboxes, checked: boolean): void => {
    this.setState(prevState => ({ filter: { ...prevState.filter, [prop]: checked } }));
  };

  updateData = (): void => {
    const url = new URL(`http://api.${window.location.host}/tea`);
    const { favorite } = this.props;
    const params = {
      search: this.filter.search,
      green: +this.filter.green,
      red: +this.filter.red,
      white: +this.filter.white,
      puer: +this.filter.puer,
      new_product: +this.filter.new_product,
      discount: +this.filter.discount,
    };
    (Object.keys(params) as Array<keyof typeof params>).forEach(key => {
      url.searchParams.append(key, params[key].toString());
    });

    if (this.filter.price.length) {
      url.searchParams.append('price[]', this.filter.price[0].toString());
      url.searchParams.append('price[]', this.filter.price[1].toString());
    }

    if (favorite) {
      url.searchParams.append('favorite', (+favorite).toString());
    }

    fetch(url.toString(), { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        this.updateFilter(data);
        return null;
      })
      .catch(e => {
        throw new Error(e);
      });
  };

  updateFilter = (data: ProductResp): void => {
    if (!this.filter.price.length) {
      this.filter.price = [data.price.min, data.price.max];
    }

    this.filter.min = data.price.min;
    this.filter.max = data.price.max;

    this.setState(() => {
      return { filter: { ...this.filter, price: [...this.filter.price] }, products: data.data };
    });
  };

  applyFilter = (): void => {
    this.setState(prevState => {
      this.filter = { ...prevState.filter, price: [...prevState.filter.price], search: this.filter.search };
      this.updateData();
    });
  };

  createProducts = (): JSX.Element[] => {
    const { products } = this.state;
    const { favorite } = this.props;
    let renderingProducts = products;
    if (favorite) {
      renderingProducts = products.filter(v => v.favorite);
    }
    return renderingProducts.map(v => <Product onClickFavorite={this.onClickFavorite} key={v.id} data={v} />);
  };

  render = (): JSX.Element => {
    const { filter } = this.state;
    const { filterPanelShow } = this.props;
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
            filter={filter}
            onClosePanel={this.onClosePanel}
            filterPanelShow={filterPanelShow}
          />
        </div>
        <div className="filter__content">
          <Search onPressEnter={this.applyFilter} onChange={this.onSearchChange} />
          <div className="filter__products">{this.createProducts()}</div>
        </div>
      </div>
    );
  };
}

export default Filter;
