import React from "react";

// CSS Import
import "./HeaderLogo.css"

// Resource Import
import logo64 from "../../../resources/link-logo-64.png";

const HeaderLogo = (props: {logoText : string}) => {

    return (
        <div className="container-fluid header-logo no-padding">
            <div>
                <img src={logo64} alt="Logo"></img>
            </div>
            <div>
                <label className="gradient text-overlay">{props.logoText}</label>
                <label className="gradient text-shadow">{props.logoText}</label>
            </div>
        </div>
    );
}

export default HeaderLogo;