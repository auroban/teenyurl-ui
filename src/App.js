import React from 'react';
import Container from 'react-bootstrap/Container';
import NavigationBar from './components/NavigationBar';
import Content from './components/Content';
import ROUTE from './constants/RouteConstants'
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeRoute: ROUTE.HOME
    }
  }

  handleRouteSelection = (route) => {
    console.debug("Current Active Route: ", this.state.activeRoute)
    console.debug("Route Selection Detected");
    console.debug("Selected Route: ", route);
    if (this.state.activeRoute !== route) {
      this.setState({
        activeRoute: route
      })
    }
  }


  render() {
    return (
      <Container fluid style={{ padding: 0 }} id="parent-container">
        <BrowserRouter>
          <NavigationBar activeTab={this.state.activeRoute} />
          <Content onRouteSelection={this.handleRouteSelection} />
        </BrowserRouter>
      </Container>

    );
  }
}

export default App;
