import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../css/NavigationBar.css'
import ROUTE from '../constants/RouteConstants';


class NavigationBar extends React.Component {

  render() {
    return (
      <Navbar bg="dark" expand="lg" id="navbar-parent">
        <Navbar.Brand href={ROUTE.HOME} id="navigation-brand">TURLS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="custom-toggle-design" />
        <Navbar.Collapse id="custom-nav-collapse-design">
          <Nav className="mr-auto" variant="pills" activeKey={this.props.activeTab}>
            <Nav.Item>
              <Nav.Link eventKey={ROUTE.HOME} href={ROUTE.HOME} className="nav-link-text custom-pill-design">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={ROUTE.API} href={ROUTE.API} className="nav-link-text custom-pill-design">API</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

}

export default NavigationBar;