import React from "react";

import "./URLInputPane.css";
import URLValidityPane from "../URLValidityPane/URLValidityPane";

const URLInputPane = () => {

    return (
        <div className="url-input-pane">
            <URLValidityPane />
            <div className="url-input-pane__input-wrapper">
                <input className="url-input-pane__input-textfield" type="url" placeholder="your really long URL goes here" />
            </div>
            <div className="url-input-pane__submit-button-wrapper unselectable">
                <div className="url-input-pane__submit-button unselectable">
                    <label className="url-input-pane__submit-button-text unselectable no-margin">GO</label>
                </div>
            </div>
        </div>
    );
}

export default URLInputPane;