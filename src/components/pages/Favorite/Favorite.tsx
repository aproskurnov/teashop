import * as React from "react";

export class Favorite extends React.Component {
    render() {
        return (
            <div style={{display:"flex"}}>
                <div style={{width: "100px", display:"flex"}}>
                    <input style={{width:"100%", boxSizing:"border-box"}} type={"text"}/>
                    <input style={{width:"100%", boxSizing:"border-box"}} type="text"/>
                    <input style={{width:"100%", boxSizing:"border-box"}} type="text"/>
                </div>
                <div>
                    <input type="text"/>
                </div>
            </div>
        );
    }
}