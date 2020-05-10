import React from 'react';
import Container from 'react-bootstrap/Container';
import "../css/Content.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import API from './API';
import ROUTE from '../constants/RouteConstants';



class Content extends React.Component {

  render() {
    return (
      <Container fluid style={{ padding: 0 }} id="content-container">
        <Router>
          <Switch>
            <Route exact path={ROUTE.HOME}>
              <Home onLoad={this.props.onRouteSelection} />
            </Route>
            <Route path={ROUTE.API}>
              <API onLoad={this.props.onRouteSelection} />
            </Route>
          </Switch>
        </Router>
      </Container>

    );
  }
}

export default Content;