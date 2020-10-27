import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ButtonRow = ({ children, sticky }) => {
  const childButtons = Array.isArray(children) ? children.filter((child) => child) : [children];

  return (
    <Container className={`button-row__container${sticky ? '--sticky' : ''}`}>
      <Row className="button-row__row" noGutters={true}>
        {childButtons.map((childButton) => {
          return (
            <Col xs={true} lg={false} className="button-row__column">
              {childButton}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ButtonRow;
