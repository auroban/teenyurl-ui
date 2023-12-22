import React from "react";

// CSS Import
import "./HeaderLogo.css"

// Resource Import
import logo64 from "../../../resources/link-logo-64.png";

const HeaderLogo = (props: {logoText : string}) => {

    return (
        <div className="container-fluid header-logo no-padding unselectable">
            <div>
                <img id="img-logo" src={logo64} alt="Logo"></img>
            </div>
            <div>
                <a target="_self" href="."><label className="gradient text-overlay unselectable">{props.logoText}</label></a>
                <label className="gradient text-shadow">{props.logoText}</label>
            </div>
        </div>
    );
}

export default HeaderLogo;