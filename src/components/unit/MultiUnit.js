import React from 'react';
import UnitHeader from './UnitHeader.js';
import UnitTable from './UnitTable.js';
import UnitFooter from './UnitFooter.js';

const MultiUnitRow = ({ units, handleClickAdd, view }) => {
  return (
    <div className="unit-row">
      <UnitHeader unit={units[0]} />
      <UnitTable units={units} handleClickAdd={handleClickAdd} displayAddButton={true} />
      <UnitFooter unit={units[0]} view={view} />
    </div>
  );
};

export default MultiUnitRow;
