import React, { useState } from 'react'

import "./TestComponent.css"

const TestComponent = () => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div id="test-root">
            <div id="container" className={expanded ? "expand" : "collapse"}>
                <div id="top" onClick={() => setExpanded(!expanded)}>

                </div>
                <div id="bottom" >
                    Test
                </div>
            </div>
        </div>
    );
}

export default TestComponent;