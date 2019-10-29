import * as React from "react";

import {Header} from "../../Header/Header";
import {Filter} from "../../Filter/Filter";

export class Home extends React.Component {
    render() {
        return (
            <div className="container container_big">
                <Header/>
                <Filter/>
            </div>
        );
    }
}