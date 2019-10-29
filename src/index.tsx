import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.scss"
import "./fonts/fonts.scss"

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Home} from "./components/pages/Home/Home";
import {Favorite} from "./components/pages/Favorite/Favorite";
import {NoMatch} from "./components/pages/NoMatch/NoMatch";

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="/favorite">
                <Favorite/>
            </Route>
            <Route path="*">
                <NoMatch/>
            </Route>
        </Switch>
    </Router>

    ),document.getElementById("app")
);