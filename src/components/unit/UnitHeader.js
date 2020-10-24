import React from 'react';
import Button from 'components/common/Button.js';

const UnitHeader = ({ unit, displayEditButton = false, handleClickEdit = false }) => {
  const unitDetails = unit.unitDetails ? unit.unitDetails : unit;

  return (
    <div className="unit-header">
      <p>{unitDetails.name}</p>
      {displayEditButton && <Button text="Edit" onClick={() => handleClickEdit(unit)} />}
      <p>{unitDetails.type}</p>
    </div>
  );
};

export default UnitHeader;
