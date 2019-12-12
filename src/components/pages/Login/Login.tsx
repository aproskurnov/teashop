import * as React from 'react';

import './Login.scss';

import { Formik, Form, FormikBag, FormikValues, FormikProps } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import LoginFormSchema from './LoginFormSchema';
import Input from '../../Input/Input';
import { Button } from '../../Button/Button';
import Header from '../../Header/Header';
import { loginAction, loginFailAction } from '../../../actions';

import { AuthAction, RootReducer, UserAuthData } from '../../../actions/types';

interface StateProps {
  isAuthenticated: boolean;
}
interface DispatchProps {
  loginSuccess: (data: UserAuthData) => void;
  loginFail: () => void;
}

type Props = StateProps & DispatchProps;

class Login extends React.Component<Props, {}> {
  redirect = (): JSX.Element => {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return null;
  };

  handleSubmit = (values: FormikValues, { setErrors }: FormikBag<FormikProps<FormikValues>, FormikValues>): void => {
    const url = new URL(`http://api.${window.location.host}/login`);
    const { loginFail, loginSuccess } = this.props;
    fetch(url.toString(), {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          loginFail();
          setErrors(data.error);
        } else {
          localStorage.setItem('token', data.token);
          loginSuccess(data);
        }
        return null;
      })
      .catch(() => {
        loginFail();
      });
  };

  render = (): JSX.Element => {
    return (
      <div className="container container_big">
        {this.redirect()}
        <Header filterPanel={false} />
        <div className="login">
          <h2 className="login__title">Вход</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginFormSchema}
            onSubmit={this.handleSubmit}
          >
            {({ values, errors, isSubmitting, handleChange, handleBlur }): JSX.Element => (
              <Form>
                <div className="login__field">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    centered
                  />

                  <div className="login__error">{errors.email}</div>
                </div>
                <div className="login__field">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    centered
                  />

                  <div className="login__error">{errors.password}</div>
                </div>
                <div className="login__button">
                  <Button text="Войти" wide disabled={isSubmitting} />
                </div>
                <div className="login__register-info">
                  Нет аккаунта?{' '}
                  <Link to="/register">
                    <span className="login__register-link">Зарегистрироваться</span>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };
}

const mapStateToProps: (state: RootReducer) => StateProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps: (dispatch: Dispatch<AuthAction>) => DispatchProps = dispatch => {
  return {
    loginSuccess: (data: UserAuthData): AuthAction => dispatch(loginAction(data)),
    loginFail: (): AuthAction => dispatch(loginFailAction()),
  };
};

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Login);
