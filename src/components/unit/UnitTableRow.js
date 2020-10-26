import React from 'react';
import Button from '../common/Button';

const UnitTableRow = ({ unit, displayAddButton = false, addUnit = false }) => {
  const unitDetails = unit.unitDetails ? unit.unitDetails : unit;

  return (
    <tr className="unit-table-row">
      <td>{`${unitDetails.size} (${unitDetails.modelCount})`}</td>
      <td>{unitDetails.speed}</td>
      <td>{unitDetails.melee}</td>
      <td>{unitDetails.ranged}</td>
      <td>{unitDetails.defence}</td>
      <td>{unitDetails.height}</td>
      <td>{unitDetails.unitStrength}</td>
      <td>{unitDetails.attacks}</td>
      <td>{unitDetails.nerve}</td>
      <td>{unitDetails.cost}</td>
      {displayAddButton && (
        <td>
          <Button text="Add" onClick={() => addUnit(unit)} />
        </td>
      )}
    </tr>
  );
};

export default UnitTableRow;
