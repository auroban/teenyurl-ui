import React from 'react';
import Container from 'react-bootstrap/Container';
import Fade from 'react-bootstrap/Fade';

const HomeFooter = (props) => {

  return (
    <Container fluid id="footer">
      <Fade in={props.show}>
        <div>
          {props.response}
        </div>
      </Fade>
    </Container>
  );

}

export default HomeFooter;