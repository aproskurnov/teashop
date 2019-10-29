import * as React from "react";

import {Input} from "../Input/Input";

export class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <Input placeholder="Найти..."/>
            </div>
        );
    }
}