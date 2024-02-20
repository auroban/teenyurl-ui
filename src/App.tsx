import "./App.css";
import "./CommonStyles.css";

import NavBar from './components/NavBar/NavBar';
import AppBody from './components/AppBody/URLShortenerSection/AppBody';
import AppFooter from './components/AppFooter/AppFooter';

function App() {

  return (
    <div className="container-fluid App">
      <NavBar />
      <AppBody />
      <AppFooter />
    </div>
  );
}

export default App;
