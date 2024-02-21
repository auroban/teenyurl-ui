import { useContext } from "react";

import "./AppBody.css";

import HeaderContextProps from "../../interfaces/contextproperties/HeaderContextProps";
import DocumentationView from "../DocumentationView/DocumentationView";
import URLShortenerView from "../URLShortenerView/URLShortenerView";
import HeaderContext from "../../contexts/HeaderContext";
import StringConstants from "../../constants/StringConstants";

const AppBody = () => {

    const contextProps : HeaderContextProps | null = useContext(HeaderContext);

    const classNames = contextProps?.currentView === StringConstants.MENU_HOME ? 
                            "app-body__element--transition translateX-0" 
                            : "app-body__element--transition translateX-100";

    return (
        <div className="app-body">
            <URLShortenerView className={ classNames } />
            <DocumentationView className={ classNames } />
        </div>
    );
}

export default AppBody;