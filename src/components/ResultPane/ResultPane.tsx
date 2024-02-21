import React, { useState } from "react";

import "./ResultPane.css"
import ResultSuccess from "./ResultSuccess/ResultSuccess";

const ResultPane = (props: {}) => {

    const [display, setDisplay] = useState(false);

    return (
        <div className="result-pane grid-center">
            <div className={ display ? "result-pane__content show" : "result-pane__content hide" }>
                <ResultSuccess />
            </div>
        </div>
    );

}

export default ResultPane;