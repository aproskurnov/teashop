import * as React from 'react';

import './Register.scss';

import { Form, Formik, FormikBag, FormikProps, FormikValues } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import RegisterFormSchema from './RegisterFormSchema';
import Input from '../../Input/Input';
import { Button } from '../../Button/Button';
import { AuthAction, UserAuth, UserAuthData } from '../../../actions/types';
import { loginAction, loginFailAction } from '../../../actions';

interface StateProps {
  isAuthenticated: boolean;
}
interface DispatchProps {
  loginSuccess: (data: UserAuthData) => void;
  loginFail: () => void;
}

type Props = StateProps & DispatchProps;

export class Register extends React.Component<Props, {}> {
  redirect = (): JSX.Element => {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return null;
  };

  handleSubmit = (values: FormikValues, { setErrors }: FormikBag<FormikProps<FormikValues>, FormikValues>): void => {
    const url = new URL(`http://api.${window.location.host}/register`);
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
      .catch(e => {
        loginFail();
        throw new Error(e);
      });
  };

  render = (): JSX.Element => {
    return (
      <div className="container container_big">
        {this.redirect()}
        <Header filterPanel={false} />
        <div className="register">
          <h2 className="register__title">Регистрация</h2>
          <Formik
            initialValues={{ name: '', email: '', phone: '', password: '', password_confirmation: '' }}
            validationSchema={RegisterFormSchema}
            onSubmit={this.handleSubmit}
          >
            {({ values, errors, isSubmitting, handleChange, handleBlur }): JSX.Element => (
              <Form>
                <div className="register__field">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    centered
                  />

                  <div className="register__error">{errors.name}</div>
                </div>
                <div className="register__field">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    centered
                  />

                  <div className="register__error">{errors.email}</div>
                </div>
                <div className="register__field">
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Телефон"
                    mask={['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    centered
                  />

                  <div className="register__error">{errors.phone}</div>
                </div>
                <div className="register__field">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    centered
                  />

                  <div className="register__error">{errors.password}</div>
                </div>
                <div className="register__field">
                  <Input
                    type="password"
                    name="password_confirmation"
                    placeholder="Подтверждение пароля"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password_confirmation}
                    centered
                  />

                  <div className="register__error">{errors.password_confirmation}</div>
                </div>
                <div className="register__button">
                  <Button text="Зарегистрироваться" wide disabled={isSubmitting} />
                </div>
                <div className="register__login-info">
                  Есть аккаунт?{' '}
                  <Link to="/login">
                    <span className="register__login-link">Войти</span>
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

const mapStateToProps: (state: UserAuth) => StateProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps: (dispatch: Dispatch<AuthAction>) => DispatchProps = dispatch => {
  return {
    loginSuccess: (data: UserAuthData): AuthAction => dispatch(loginAction(data)),
    loginFail: (): AuthAction => dispatch(loginFailAction()),
  };
};

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Register);
