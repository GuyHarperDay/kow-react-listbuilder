import React from 'react';
import Button from 'components/common/Button.js';

const UnitHeader = ({ unit, displayEditButton = false, handleClickEdit = false }) => {
  const unitDetails = unit.unitDetails ? unit.unitDetails : unit;
  const unitDescription = unitDetails.size === 'Hero' ? `Hero (${unitDetails.type})` : unitDetails.type;

  return (
    <div className="unit-header">
      <p>{unitDetails.name}</p>
      {displayEditButton && <Button text="Edit" onClick={() => handleClickEdit(unit)} />}
      <p>{unitDescription}</p>
    </div>
  );
};

export default UnitHeader;
