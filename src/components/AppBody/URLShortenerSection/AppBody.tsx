import React from "react";

import "./AppBody.css";
import URLInputPane from "./URLInputPane/URLInputPane";
import URLValidityPane from "./URLValidityPane/URLValidityPane";
import ResultPane from "./ResultPane/ResultPane";

const AppBody = () => {

    return(
        <div id="app-body" className="container-fluid">
            <div id="content-container" className="container-fluid">
                <URLInputPane />
                <ResultPane />
            </div>
        </div>
    );
}

export default AppBody;