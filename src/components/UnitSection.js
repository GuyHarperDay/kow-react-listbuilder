import React from 'react';
import UnitRow from './UnitRow';

const UnitSection = ({ section }) => {
  return (
    {section.units.map(unit => {
      <UnitRow
        unit={unit}
        key={unit.id}
        displayAddButton={false}
        displayEditButton={true}
        handleClickEdit={() => handleEditUnitClick(unit)}
      />
    })}
  );
};

export default UnitSection;
