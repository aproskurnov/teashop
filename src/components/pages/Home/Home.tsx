import * as React from "react";

import {Header} from "../../Header/Header";
import {Filter} from "../../Filter/Filter";

export class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <Header/>
                <Filter/>
            </div>
        );
    }
}