import React from 'react';
import Button from 'components/common/Button.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UnitHeader = ({ unit, displayEditButton = false, handleClickEdit = false }) => {
  const unitDetails = unit.unitDetails ? unit.unitDetails : unit;
  const unitDescription = unitDetails.size === 'Hero' ? `Hero (${unitDetails.type})` : unitDetails.type;

  return (
    <Row className="unit-header">
      <Col className="unit-header__unit-name-container">
        <p className="unit-header__unit-name">{unitDetails.name}</p>
        {displayEditButton && <Button text="Edit" onClick={() => handleClickEdit(unit)} size="sm" />}
      </Col>
      <Col className="unit-header__unit-type-container">
        <p className="unit-header__unit-type">{unitDescription}</p>
      </Col>
    </Row>
  );
};

export default UnitHeader;
