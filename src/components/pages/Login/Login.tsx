import * as React from "react";

import "./Login.scss";

import {Formik, Form, FormikBag, FormikValues, FormikProps} from "formik"
import LoginFormSchema from "./LoginFormSchema";
import {Input} from "../../Input/Input";
import {Button} from "../../Button/Button";
import {Link} from "react-router-dom";
import {Header} from "../../Header/Header";
import store from "../../../store"
import {loginAction, loginFailAction} from "../../../actions";
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {IAuthAction, IUserAuth, IUserAuthData} from "../../../actions/types";
import {Dispatch} from "redux";

interface ILoginProps{

}

interface ILoginState{

}

interface IStateProps{
    isAuthenticated: boolean
}
interface IDispatchProps{
    loginSuccess: (data: IUserAuthData)=>void,
    loginFail: ()=>void
}

type Props = ILoginProps & IStateProps & IDispatchProps;


class Login extends React.Component<Props, ILoginState> {
    constructor(props:Props){
        super(props);

        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(values:FormikValues, { setErrors }: FormikBag<FormikProps<FormikValues>, FormikValues> ){
        let url = new URL('http://api.' + window.location.host + '/login');
        fetch(url.toString(), {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response=>response.json())
            .then(data=>{
                if (data.error){
                    this.props.loginFail();
                    setErrors(data.error);
                }else{
                    localStorage.setItem('token', data.token);
                    this.props.loginSuccess(data);
                }
            }).catch(()=> {
                store.dispatch(loginFailAction());
        });
    }
    redirect(){
        if (this.props.isAuthenticated){
            return <Redirect to={"/"}/>;
        }
    }
    render() {
        return (
            <div className="container container_big">
                {this.redirect()}
                <Header filterPanel={false}/>
                <div className="login">
                    <h2 className={"login__title"}>Вход</h2>
                    <Formik
                        initialValues={{email:"", password:""}}
                        validationSchema={LoginFormSchema}
                        onSubmit={this.handleSubmit}
                    >
                        {({
                              values,
                              errors,
                              isSubmitting,
                              handleChange,
                              handleBlur

                          })=>(
                            <Form>
                                <div className="login__field">
                                    <Input type={"email"} name={"email"} placeholder={"Email"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.email}
                                           centered={true}
                                    />

                                    <div className="login__error">
                                        {errors.email}
                                    </div>
                                </div>
                                <div className="login__field">
                                    <Input type={"password"} name={"password"} placeholder={"Пароль"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.password}
                                           centered={true}
                                    />

                                    <div className="login__error">
                                        {errors.password}
                                    </div>
                                </div>
                                <div className="login__button">
                                    <Button text="Войти" wide={true} disabled={isSubmitting}/>
                                </div>
                                <div className="login__register-info">
                                    Нет аккаунта? <Link to={"/register"}><span className="login__register-link">Зарегистрироваться</span></Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}

const mapStateToProps:(state:IUserAuth)=>IStateProps = (state)=>{
    return {
        isAuthenticated:state.isAuthenticated
    }
};

const mapDispatchToProps:(dispatch:Dispatch<IAuthAction>)=>IDispatchProps = (dispatch) => {
    return {
        loginSuccess: (data: IUserAuthData) => dispatch(loginAction(data)),
        loginFail: ()=>dispatch(loginFailAction())
    }
};

export default connect<IStateProps, IDispatchProps, ILoginProps>(mapStateToProps, mapDispatchToProps)(Login);