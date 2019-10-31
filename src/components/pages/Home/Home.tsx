import * as React from "react";

import {Header} from "../../Header/Header";
import {Filter} from "../../Filter/Filter";

interface IHomeState{
    isFilterPanelShow: boolean
}

export class Home extends React.Component<{}, IHomeState> {
    constructor(props:{}) {
        super(props);
        this.state = {isFilterPanelShow:false};

        this.onFilterClick = this.onFilterClick.bind(this);
        this.onFilterPanelClose = this.onFilterPanelClose.bind(this);
    }
    onFilterPanelClose(){
        this.setState({isFilterPanelShow: false})
    }
    onFilterClick(){
        this.setState({isFilterPanelShow: true})
    }
    render() {
        return (
            <div className="container container_big">
                <Header onFilterClick={this.onFilterClick}/>
                <Filter onClosePanel={this.onFilterPanelClose} filterPanelShow={this.state.isFilterPanelShow}/>
            </div>
        );
    }
}