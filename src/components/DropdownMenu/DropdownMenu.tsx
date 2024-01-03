import React, { useState } from "react";
import _ from "lodash";

import "./DropdownMenu.css"

import dropdownArrow from "../../resources/dropdown-arrow-16.png";

const DropdownMenu = (props : { width?: string, header: string, items : Array<string>, onClick : (param : string) => void, defaultValue? : string }) => {

    const stateOpen = "OPEN";
    const stateClosed = "CLOSED";
    const stateInit = "INIT";
    
    const [menuState, setMenuState] = useState(stateInit);
    const [arrowClassNames, setArrowClassNames] = useState("");
    const [menuItemsClassNames, setMenuItemsClassNames] = useState("state-collapsed");
    const [duration, setDuration] = useState("");

    const items = _.map(props.items, (item) => {
        return (
            <div key={item} className="grid-center dd-menu-item label-text pointer-on-hover unselectable" onClick={() => handleDuratioSelection(item)}>
                <label className="label-text no-margin pointer-on-hover unselectable">
                    {item}
                </label>
            </div>
        );
    });

    const handleDuratioSelection = (unit : string) => {
        console.debug("Selected Duration: ", unit);
        setDuration(unit);
        toggleMenu();
        props.onClick(unit);
    }

    const toggleMenu = () => {
        if (menuState === stateInit || menuState === stateClosed) {
            setArrowClassNames("unselectable pointer-on-hover animate-arrow-up");
            setMenuItemsClassNames("unselectable state-expanded")
            setMenuState(stateOpen);
        } else {
            setMenuItemsClassNames("unselectable state-collapsed")
            setArrowClassNames("unselectable pointer-on-hover animate-arrow-down");
            setMenuState(stateClosed);
        }
    }

    return (
        <div id="dd-menu-container" style={{ width: props.width }}>
            <div id="dd-menu-header" className="unselectable" onClick={() => toggleMenu()}>
                <div className="grid-center dd-menu-header-item pointer-on-hover unselectable">
                    <label className="unselectable no-margin pointer-on-hover label-text unselectable" style={ duration === "" ? {color: "#dadada"} : {} }>
                        { duration === "" ? props.header : duration }
                    </label>
                </div>
                <div className="grid-center dd-menu-header-item pointer-on-hover unselectable">
                    <img id="dd-header-image" src={ dropdownArrow } alt="dropdown-arrow" className={arrowClassNames}></img>
                </div>
            </div>
            <div id="dd-menu-items" style={{ width: props.width }} className={menuItemsClassNames}>
                {items}
            </div>
        </div>
    );

}

export default DropdownMenu;