import * as React from "react";

import "./../../index.scss"
import "./../../fonts/fonts.scss"

import {Route, Switch} from "react-router";
import {Home} from "../pages/Home/Home";
import {Favorite} from "../pages/Favorite/Favorite";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import {NoMatch} from "../pages/NoMatch/NoMatch";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import store from '../../store';
import {loadData} from "../../actions";
import Logout from "../pages/Logout/Logout";
import {Tea} from "../pages/Tea/Tea";
import {Cart} from "../pages/Cart/Cart";



export class App extends React.Component<{}, {}> {
    constructor(props:{}){
        super(props);
    }
    componentDidMount(): void {
        store.dispatch(loadData());
    }

    render(){
        return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/favorite">
                        <Favorite/>
                    </Route>
                    <Route path="/cart">
                        <Cart/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/logout">
                        <Logout/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path={"/tea/:id"} component={Tea}/>
                    <Route path="*">
                        <NoMatch/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
        )
    }
}