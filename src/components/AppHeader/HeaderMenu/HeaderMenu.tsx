import React from "react";

// CSS Import
import "./HeaderMenu.css"
import SlidingButton from "../SlidingButton/SlidingButton";

const HeaderMenu = () => {

    return (
        <div className="container-fluid no-padding header-menu">
            <div className="container no-padding menu-box">
                <SlidingButton isSelected={true} buttonText="Home" isLast={false} />
                <SlidingButton isSelected={false} buttonText="Docs" isLast={true}/>
            </div>
        </div>
    );

}

export default HeaderMenu;