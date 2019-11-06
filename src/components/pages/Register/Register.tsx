import * as React from "react";

import "./Register.scss";

import Header from "../../Header/Header";
import {Form, Formik, FormikBag, FormikProps, FormikValues} from "formik";
import RegisterFormSchema from "../Register/RegisterFormSchema";
import {Input} from "../../Input/Input";
import {Button} from "../../Button/Button";
import {Link, Redirect} from "react-router-dom";
import {IAuthAction, IUserAuth, IUserAuthData} from "../../../actions/types";
import {Dispatch} from "redux";
import {loginAction, loginFailAction} from "../../../actions";
import {connect} from "react-redux";

interface IRegisterProps{

}

interface IRegisterState{

}

interface IStateProps{
    isAuthenticated: boolean
}
interface IDispatchProps{
    loginSuccess: (data: IUserAuthData)=>void,
    loginFail: ()=>void
}

type Props = IRegisterProps & IStateProps & IDispatchProps;


export class Register extends React.Component<Props, IRegisterState> {
    constructor(props:Props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    redirect(){
        if (this.props.isAuthenticated){
            return <Redirect to={"/"}/>;
        }
    }
    handleSubmit(values:FormikValues, { setErrors }: FormikBag<FormikProps<FormikValues>, FormikValues> ){
        let url = new URL('http://api.' + window.location.host + '/register');
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
                    console.log(data.error);
                    setErrors(data.error);
                }else{
                    localStorage.setItem('token', data.token);
                    this.props.loginSuccess(data);
                }
            }).catch(()=> {
                this.props.loginFail();
        });
    }
    render() {
        return (
            <div className="container container_big">
                {this.redirect()}
                <Header filterPanel={false}/>
                <div className="register">
                    <h2 className={"register__title"}>Регистрация</h2>
                    <Formik
                        initialValues={{name:"", email:"", phone:"", password:"", password_confirmation:""}}
                        validationSchema={RegisterFormSchema}
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
                                <div className="register__field">
                                    <Input type={"text"} name={"name"} placeholder={"Имя"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.name}
                                           centered={true}
                                    />

                                    <div className="register__error">
                                        {errors.name}
                                    </div>
                                </div>
                                <div className="register__field">
                                    <Input type={"email"} name={"email"} placeholder={"Email"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.email}
                                           centered={true}
                                    />

                                    <div className="register__error">
                                        {errors.email}
                                    </div>
                                </div>
                                <div className="register__field">
                                    <Input type={"text"} name={"phone"} placeholder={"Телефон"}
                                           mask={['+', '7', '(',/[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.phone}
                                           centered={true}
                                    />

                                    <div className="register__error">
                                        {errors.phone}
                                    </div>
                                </div>
                                <div className="register__field">
                                    <Input type={"password"} name={"password"} placeholder={"Пароль"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.password}
                                           centered={true}
                                    />

                                    <div className="register__error">
                                        {errors.password}
                                    </div>
                                </div>
                                <div className="register__field">
                                    <Input type={"password"} name={"password_confirmation"} placeholder={"Подтверждение пароля"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.password_confirmation}
                                           centered={true}
                                    />

                                    <div className="register__error">
                                        {errors.password_confirmation}
                                    </div>
                                </div>
                                <div className="register__button">
                                    <Button text="Зарегистрироваться" wide={true} disabled={isSubmitting}/>
                                </div>
                                <div className="register__login-info">
                                    Есть аккаунт? <Link to={"/login"}><span className="register__login-link">Войти</span></Link>
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

export default connect<IStateProps, IDispatchProps, IRegisterProps>(mapStateToProps, mapDispatchToProps)(Register);