import * as React from 'react';

import './NoMatch.scss';

import Header from '../../Header/Header';

const NoMatch: React.FunctionComponent = () => (
  <div className="container container_big">
    <Header filterPanel={false} />
    <div className="no-match">
      <h1>404</h1>
    </div>
  </div>
);

export default NoMatch;
