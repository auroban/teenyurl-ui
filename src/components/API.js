import React from 'react';
import ROUTE from '../constants/RouteConstants';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/API.css'
import Jumbotron from 'react-bootstrap/Jumbotron';

class API extends React.Component {

  componentDidMount = () => {
    console.debug("Mounted Component: API")
    this.props.onLoad(ROUTE.API);
  }

  render() {
    console.info("Loading APIs....")
    return(
      <Jumbotron fluid id="api-container">

        <p>Work in progress.....</p>

      </Jumbotron>
    );
  }

}

export default API;