import React from "react";

import "./AppBody.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const AppBody = () => {

    let menuItems = [ "DAY", "MONTH", "YEAR" ];

    return(
        <div id="app-body" className="container-fluid">
            <div id="content-container" className="container-fluid">
                <div id="content-url" className="container-fluid">
                    <div id="url-input">
                        <input id="url-input-textfield" type="url" placeholder="your really long URL goes here" />
                    </div>
                    <div id="url-submit-button-container" className="unselectable">
                        <div id="url-submit-button" className="unselectable">
                            <label className="unselectable no-margin">GO</label>
                        </div>
                    </div>
                </div>
                <div id="content-validity" className="container-fluid">
                    <div className="grid-center">
                        <label className="no-margin label-text unselectable">Valid For</label>
                    </div>
                    <div className="grid-center no-margin no-padding">
                        <input id="duration-value" type="number" maxLength={4} min={1} max={9999} defaultValue={1} pattern="\d*" className="label-text no-margin no-padding"/>
                    </div>
                    <div className="grid-center">
                        <DropdownMenu header="Duration" width="200px" items={ menuItems } onClick={(param : string) => console.info("Item Clicked: ", param)}></DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppBody;