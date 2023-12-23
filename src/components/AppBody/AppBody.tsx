import React from "react";

import "./AppBody.css"

const AppBody = () => {
    return(
        <div id="app-body" className="container-fluid">
            <div id="content-container" className="container-fluid">
                <div id="content-url" className="container-fluid">
                    <div id="url=input">
                        <input id="url-input-textfield" type="url" placeholder="https://www.example.com" />
                    </div>
                    <div id="url-submit-button">
                        <label>Go</label>
                    </div>
                </div>
                <div className="container-fluid content-validity">
                        hello
                </div>
            </div>
        </div>
    );
}

export default AppBody;