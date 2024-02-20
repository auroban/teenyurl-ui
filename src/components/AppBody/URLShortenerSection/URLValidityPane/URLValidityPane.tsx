import React from "react";

import DropdownMenu from "../../../DropdownMenu/DropdownMenu";

import "./URLValidityPane.css";

const URLValidityPane = () => {

    let menuItems = [ "DAY", "MONTH", "YEAR" ];
    
    return (
        <div className="url-validity-pane">
            <div className="grid-center">
                <label className="no-margin label-text unselectable">Valid For</label>
            </div>
            <div className="grid-center no-margin no-padding">
                <input type="number" maxLength={4} min={1} max={9999} defaultValue={1} pattern="\d*" className="url-validity-pane__duration_textfield label-text no-margin no-padding"/>
            </div>
            <div className="grid-center">
                <DropdownMenu header="Duration" width="200px" items={ menuItems } onClick={(param : string) => console.info("Item Clicked: ", param)}></DropdownMenu>
            </div>
        </div>
    );
}

export default URLValidityPane;