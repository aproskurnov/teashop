import * as React from 'react';
import Header from '../../Header/Header';
import { Filter } from '../../Filter/Filter';

interface FilterState {
  isFilterPanelShow: boolean;
}

class Favorite extends React.Component<{}, FilterState> {
  constructor(props: {}) {
    super(props);
    this.state = { isFilterPanelShow: false };
  }

  onFilterPanelClose = (): void => {
    this.setState({ isFilterPanelShow: false });
  };

  onFilterClick = (): void => {
    this.setState({ isFilterPanelShow: true });
  };

  render = (): JSX.Element => {
    const { isFilterPanelShow } = this.state;
    return (
      <div className="container container_big">
        <Header onFilterClick={this.onFilterClick} />
        <Filter favorite onClosePanel={this.onFilterPanelClose} filterPanelShow={isFilterPanelShow} />
      </div>
    );
  };
}

export default Favorite;
