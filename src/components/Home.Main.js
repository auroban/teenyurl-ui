import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';


const DURATION_UNIT = {
  DAYS: "DAYS",
  WEEKS: "WEEKS",
  MONTHS: "MONTHS",
  YEARS: "YEARS"
}

const DURATION_VALUE_TITLE = "Duration Value";
const DURATION_UNIT_TITLE = "Duration Unit";

const RANGE = {
  DAYS: [3, 4, 5, 6, 7],
  WEEKS: [1, 2, 3, 4],
  MONTHS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  YEARS: [1]
}

const BUTTON_TEXT = {
  SHORTEN: "Shorten",
  SHORTENING: "  Shortening...."
}


const BASE = 'https://www.turls.in';
const VERSION = "v1";

const API = {
  CREATE_SHORT_URL: BASE + "/" + VERSION + "/url"
}

const addDelay = async (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(time);
    }, time);
  })
}

class HomeMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      durationUnitTitle: "Duration Unit",
      durationValueTitle: DURATION_VALUE_TITLE,
      durationValues: null,
      selectedDurationUnit: null,
      selectedDurationValue: null,
      buttonSpinner: null,
      buttonText: BUTTON_TEXT.SHORTEN,
      buttonDisabled: true,
      formValidated: false,
      urlInput: null
    }

    this.handleDurationUnitSelection = this.handleDurationUnitSelection.bind(this);
    this.generateDurationValues = this.generateDurationValues.bind(this);
    this.handleDurationValueSelection = this.handleDurationValueSelection.bind(this);
    this.handleUrlInputOnChange = this.handleUrlInputOnChange.bind(this);
    this.handleUrlInputOnBlur = this.handleUrlInputOnBlur.bind(this);
  }

  handleDurationUnitSelection = (event) => {

    let range = null;
    switch (event) {
      case DURATION_UNIT.DAYS:
        range = RANGE.DAYS;
        break;
      case DURATION_UNIT.WEEKS:
        range = RANGE.WEEKS;
        break;
      case DURATION_UNIT.MONTHS:
        range = RANGE.MONTHS;
        break;
      case DURATION_UNIT.YEARS:
        range = RANGE.YEARS;
        break;
      default:
        console.warn("Undefined value selected");
    }

    this.setState({
      durationUnitTitle: event,
      selectedDurationUnit: event,
      selectedDurationValue: null,
      durationValueTitle: DURATION_VALUE_TITLE,
      durationValues: this.generateDurationValues(range),
      buttonDisabled: true
    });
  }

  generateDurationValues = (range) => {
    let menuItems = range.map((val) =>
      <Dropdown.Item key={val} eventKey={val}>{val}</Dropdown.Item>
    );
    return menuItems;
  }

  handleDurationValueSelection = (event) => {
    this.setState({
      durationValueTitle: event,
      selectedDurationValue: event,
      buttonDisabled: false
    })
  }

  handleSubmit = async (event) => {
    this.props.onReset();
    console.debug("Getting called")
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      console.log("Form Valid");
      this.setState({
        buttonSpinner: this.getButtonSpinner(),
        buttonText: BUTTON_TEXT.SHORTENING,
        buttonDisabled: true,
        formValidated: true
      });

      let request = {
        url: this.state.urlInput,
        expiry: {
          unit: this.state.selectedDurationUnit,
          value: this.state.selectedDurationValue
        }
      }
      console.log("Formed Req:\n", request);
      await addDelay(2000);

      let reqBody = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
      }
      let response = await fetch(API.CREATE_SHORT_URL, reqBody);
      let data = await response.json();
      console.log("Data Received:\n", data);
      this.handleResponse(data, form);
    } else {
      console.log("Form Invalid");
      this.setState({
        formValidated: true
      })
    }
  }

  getButtonSpinner = () => {
    return (
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    );
  }

  handleUrlInputOnChange = (event) => {
    this.setState({
      urlInput: event.currentTarget.value,
      formValidated: true
    })
  }

  handleResponse = (response, form) => {
    console.debug("Handling response: ", response);
    let status = response.status;
    console.log(status);

    if (status === 'SUCCESS') {
      this.props.onSuccess(response);
      this.resetForm(form);
    } else {
      console.error("Failed to shorten the given URL")
      this.clearButtonState();
      this.props.onFailure(response);
    }

  }

  resetForm(form) {
    this.resetDurationUnit();
    this.resetDurationValue();
    this.resetFormValidation();
    this.resetButton();
    form.reset();
  }

  resetDurationUnit = () => {
    this.setState({
      durationUnitTitle: DURATION_UNIT_TITLE,
      selectedDurationUnit: null
    });
  }

  resetDurationValue = () => {
    this.setState({
      durationValueTitle: DURATION_VALUE_TITLE,
      durationValues: null,
      selectedDurationValue: null
    })
  }

  resetFormValidation = () => {
    this.setState({
      formValidated: false
    })
  }

  resetButton = () => {
    this.setState({
      buttonDisabled: true,
      buttonSpinner: null,
      buttonText: BUTTON_TEXT.SHORTEN
    })
  }

  clearButtonState = () => {
    this.setState({
      buttonDisabled: false,
      buttonSpinner: null,
      buttonText: BUTTON_TEXT.SHORTEN
    })
  }

  handleUrlInputOnBlur = () => {
    this.setState({
      formValidated: true
    })
  }

  render() {
    return (
      <Container fluid style={{ padding: 0 }} id="main">
        <span style={{ flex: 2 }} />
        <Form id="input-form" onSubmit={this.handleSubmit} noValidate validated={this.state.formValidated}>
          <Form.Row className="custom-row">
            <Col>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ fontWeight: 900 }}>URL:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="plaintext" placeholder="https://www.example.com" required onChange={this.handleUrlInputOnChange} onBlur={this.handleUrlInputOnBlur} />
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">URL is required!</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Label className="custom-label">Please select the validity duration of the URL:</Form.Label>
          </Form.Row>
          <Form.Row className="custom-row">
            <Dropdown className="custom-dropdown" onSelect={this.handleDurationUnitSelection}>
              <Dropdown.Toggle variant="success" style={{ width: "150px" }}>
                {this.state.durationUnitTitle}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey={DURATION_UNIT.DAYS}>{DURATION_UNIT.DAYS}</Dropdown.Item>
                <Dropdown.Item eventKey={DURATION_UNIT.WEEKS}>{DURATION_UNIT.WEEKS}</Dropdown.Item>
                <Dropdown.Item eventKey={DURATION_UNIT.MONTHS}>{DURATION_UNIT.MONTHS}</Dropdown.Item>
                <Dropdown.Item eventKey={DURATION_UNIT.YEARS}>{DURATION_UNIT.YEARS}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="custom-dropdown" onSelect={this.handleDurationValueSelection}>
              <Dropdown.Toggle style={{ width: "150px" }}>
                {this.state.durationValueTitle}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.state.durationValues}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Row>
          <Form.Row className="custom-row">
            <Button type="submit" disabled={this.state.buttonDisabled} style={{ width: "150px" }}>
              {this.state.buttonSpinner}
              {this.state.buttonText}
            </Button>
          </Form.Row>
        </Form>
        <span style={{ flex: 2 }} />
      </Container>
    );
  }

}

export default HomeMain;