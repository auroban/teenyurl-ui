import React from 'react';
import ROUTE from '../constants/RouteConstants';
import Jumbotron from 'react-bootstrap/Jumbotron';
import HomeHeader from './Home.Header';
import HomeMain from './Home.Main';
import HomeFooter from './Home.Footer';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import "../css/Home.css"
import Col from 'react-bootstrap/Col';


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showFooter: false,
      response: null,
    }

    this.handleOnSuccess = this.handleOnSuccess.bind(this);
    this.handleOnFailure = this.handleOnFailure.bind(this);
    this.handleOnReset = this.handleOnReset.bind(this);
  }

  handleOnSuccess = (resp) => {
    console.debug("Handling Response on Success");
    let data = resp.response;
    let successCard = (
      <Card border="success" className="custom-card-design">
        <Card.Header id="success-card-header" className="card-header-text-spec">SUCCESS</Card.Header>
        <Card.Body id="success-card-body" className="custom-card-body">
          <span style={{ flex: 1 }} />
          <Form style={{ flex: 5, display: "flex", flexFlow: "column wrap" }}>
            <Form.Row className="card-form-row-flex">
              <Col style={{ flex: 1 }}>
                <Form.Label className="card-form-text">URL Key:</Form.Label>
              </Col>
              <Col style={{ flex: 3 }}>
                <Form.Label className="card-form-text card-form-value">{data.key}</Form.Label>
              </Col>
            </Form.Row>
            <Form.Row className="card-form-row-flex">
              <Col style={{ flex: 1 }}>
                <Form.Label className="card-form-text">Complete URL:</Form.Label>
              </Col>
              <Col style={{ flex: 3 }}>
                <Form.Label className="card-form-text card-form-value">{data.completeUrl}</Form.Label>
              </Col>
            </Form.Row>
            <Form.Row className="card-form-row-flex">
              <Col style={{ flex: 1 }}>
                <Form.Label className="card-form-text">Valid Till:</Form.Label>
              </Col>
              <Col style={{ flex: 3 }}>
                <Form.Label className="card-form-text card-form-value">{data.expiry}</Form.Label>
              </Col>
            </Form.Row>
          </Form>
          <span style={{ flex: 1 }} />
        </Card.Body>
      </Card>
    );
    this.setState({
      showFooter: true,
      response: successCard,
    })
  }

  handleOnFailure = (data) => {
    console.debug("Handling Response on Failure");
    let failureCard = (
      <Card border="danger" className="custom-card-design">
        <Card.Header id="failure-card-header" className="card-header-text-spec">FAILURE</Card.Header>
        <Card.Body id="failure-card-body" className="custom-card-body">
          {/* <span style={{ flex: 1 }} /> */}
          <Form style={{ flex: 5, display: "flex", flexFlow: "column wrap" }}>
            <Form.Row className="card-form-row-flex">
              <Col style={{ flex: 1 }}>
                <Form.Label className="card-form-text">Error Message</Form.Label>
              </Col>
              <Col style={{ flex: 3 }}>
                <Form.Label className="card-form-text card-form-value">{data.message}</Form.Label>
              </Col>
            </Form.Row>
            <Form.Row className="card-form-row-flex">
              <Col style={{ flex: 1 }}>
                <Form.Label className="card-form-text">Error Code:</Form.Label>
              </Col>
              <Col style={{ flex: 3 }}>
                <Form.Label className="card-form-text card-form-value">{data.error}</Form.Label>
              </Col>
            </Form.Row>
          </Form>
          {/* <span style={{ flex: 1 }} /> */}
        </Card.Body>
      </Card>
    );
    this.setState({
      showFooter: true,
      response: failureCard
    })
  }

  handleOnReset = () => {
    this.setState({
      showFooter: false,
      response: null
    })
  }

  componentDidMount = () => {
    console.debug("Mounted Component: HOME")
    this.props.onLoad(ROUTE.HOME);
  }

  render() {

    console.log("Loading Home....")
    return (
      <Jumbotron fluid id="home-container">
        <HomeHeader />
        <HomeMain onSuccess={this.handleOnSuccess} onFailure={this.handleOnFailure} onReset={this.handleOnReset} />
        <HomeFooter show={this.state.showFooter} response={this.state.response} />
      </Jumbotron>
    );
  }
}

export default Home;