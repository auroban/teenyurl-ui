import React from "react";
import "./AppHeader.css";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderMenu from "./HeaderMenu/HeaderMenu";

const AppHeader = () => {

    const logoHeaderText = "turls.in"

    return (
        <div className="container-fluid app-header no-padding">
            <HeaderLogo logoText="turls.in"/>
            <HeaderMenu />
        </div>
    );

}

export default AppHeader;