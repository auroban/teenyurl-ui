import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import AppBody from './components/AppBody/AppBody';
import AppFooter from './components/AppFooter/AppFooter';

function App() {

  return (
    <div className="container-fluid App">
      <AppHeader />
      <AppBody />
      <AppFooter />
    </div>
  );
}

export default App;
