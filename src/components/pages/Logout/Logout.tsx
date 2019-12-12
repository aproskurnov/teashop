import * as React from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AuthAction, UserAuth } from '../../../actions/types';
import { logoutAction } from '../../../actions';

interface StateProps {
  isAuthenticated: boolean;
}
interface DispatchProps {
  logout: () => void;
}

type Props = StateProps & DispatchProps;

class Logout extends React.Component<Props, {}> {
  process = (): JSX.Element => {
    const { isAuthenticated, logout } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    }
    logout();
    localStorage.removeItem('token');
    return null;
  };

  render = (): JSX.Element => {
    return <div className="container container_big">{this.process()}</div>;
  };
}

const mapStateToProps: (state: UserAuth) => StateProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps: (dispatch: Dispatch<AuthAction>) => DispatchProps = dispatch => {
  return {
    logout: (): AuthAction => dispatch(logoutAction()),
  };
};

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Logout);
