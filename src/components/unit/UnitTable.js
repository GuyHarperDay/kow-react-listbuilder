import React from 'react';
import UnitTableRow from './UnitTableRow';

const UnitTable = ({ units, displayAddButton = false, handleClickAdd = false }) => {
  return (
    <table className="unit-table">
      <tbody>
        <tr>
          <th>Unit size</th>
          <th>Sp</th>
          <th>Me</th>
          <th>Ra</th>
          <th>De</th>
          <th>H</th>
          <th>US</th>
          <th>Att</th>
          <th>Ne</th>
          <th>Pts</th>
        </tr>
        {units.map((unit) => (
          <UnitTableRow
            key={unit.unitDetails ? `${unit.unitDetails.name}-${unit.unitDetails.size}` : `${unit.name}-${unit.size}`}
            unit={unit}
            displayAddButton={displayAddButton}
            handleClickAdd={handleClickAdd}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UnitTable;
