import { useState } from "react";

import "./App.css";
import "./CommonStyles.css";

import NavBar from './components/NavBar/NavBar';
import AppFooter from './components/AppFooter/AppFooter';
import HeaderContext from "./contexts/HeaderContext";
import StringConstants from "./constants/StringConstants";
import HeaderContextProps from "./interfaces/contextproperties/HeaderContextProps";
import AppBody from "./components/AppBody/AppBody";

function App() {

  const [currentView, setCurrentView] = useState(StringConstants.MENU_HOME);

  const setCurrentViewIndex = (index: number) => {
    let viewName: string = "";
    if (index === 0) {
      viewName = StringConstants.MENU_HOME;
    } else if (index === 1) {
      viewName = StringConstants.MENU_DOCS;
    }
    setCurrentView(viewName);
  }

  const headerContextProp: HeaderContextProps = {
    currentView : currentView,
    setCurrentViewIndex : setCurrentViewIndex,
  }

  return (
    <div className="App">
      <HeaderContext.Provider value={ headerContextProp } >
        <NavBar />
        <AppBody />
      </HeaderContext.Provider>
      <AppFooter />
    </div>
  );
}

export default App;
