import React from "react";

import "./SlidingButton.css"

const SlidingButton = (props: { buttonText : string, onClick : () => void }) => {
    
    return (
        <div className="container-fluid sliding-button unselectable" onClick={() => props.onClick()}>
            <label className="sliding-button-text-style unselectable">{ props.buttonText }</label>
        </div>
    );
}

export default SlidingButton;