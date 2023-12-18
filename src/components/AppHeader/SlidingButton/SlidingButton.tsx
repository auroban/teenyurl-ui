import React from "react";

import "./SlidingButton.css"

const SlidingButton = (props: { isSelected : boolean, buttonText : string, isLast: boolean }) => {

    let buttonStyleClassList : string;
    let textStyleClassList : string;

    if (props.isSelected) {
        if (props.isLast) {
            buttonStyleClassList = "container-fluid sliding-button button-selected box-shadow-left";
        } else {
            buttonStyleClassList = "container-fluid sliding-button button-selected box-shadow-right";
        }
        textStyleClassList = "sliding-button-text-style text-selected";
    } else {
        buttonStyleClassList = "container-fluid sliding-button";
        textStyleClassList = "sliding-button-text-style";
    }

    return (
        <div className={ buttonStyleClassList }>
            <label className={ textStyleClassList }>{ props.buttonText }</label>
        </div>
    );
}

export default SlidingButton;