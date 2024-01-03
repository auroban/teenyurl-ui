import React from "react";
import "./AppHeader.css";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderMenu from "./HeaderMenu/HeaderMenu";

const AppHeader = () => {

    return (
        <div className="container-fluid app-header no-padding">
            <HeaderLogo logoText="turls.in"/>
            <HeaderMenu namesOfButtons={[ "Home", "Docs" ]} />
        </div>
    );

}

export default AppHeader;