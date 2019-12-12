import * as React from 'react';

import { Input } from '../Input/Input';

interface SearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

class Search extends React.Component<SearchProps, {}> {
  constructor(props: SearchProps) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const { onPressEnter } = this.props;
    if (e.key === 'Enter') {
      onPressEnter(e);
    }
  };

  render = (): JSX.Element => {
    const { onChange } = this.props;
    return (
      <div className="search">
        <Input onKeyDown={this.onKeyDown} onChange={onChange} placeholder="Найти..." />
      </div>
    );
  };
}

export default Search;
