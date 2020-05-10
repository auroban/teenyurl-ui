import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';

const HomeHeader = () => {
  return (
    <Container fuild="true" id="header" style={{ padding: 0 }}>
      <h1>TeenyURL</h1>
      <p>A simple URL shortening application</p>
    </Container>
  );
}

export default HomeHeader;