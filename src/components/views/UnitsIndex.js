import React from 'react';
import UnitRow from 'components/UnitRow';
import Button from 'components/common/Button';

const UnitsIndex = ({ army, goToDisplay, selectUnit, selectArmy, fromArmyList }) => {
  function handleClickAdd(unit) {
    selectUnit(unit);
    selectArmy(army.name);
    goToDisplay('unitSelect');
  }

  const displaySelectOtherArmy = true;

  return (
    <section className="units-index">
      {displaySelectOtherArmy && <Button text="Select other army" onClick={() => goToDisplay('armiesIndex')} />}
      {army.units.map((unit, index) => {
        return (
          <UnitRow
            unit={unit}
            displayAddButton={true}
            displayHead={!(army.units[index - 1] && army.units[index - 1].name === unit.name)}
            displaySpecialRules={!army.units[index + 1] || army.units[index + 1].name !== unit.name}
            displayRowHeadings={!(army.units[index - 1] && army.units[index - 1].name === unit.name)}
            handleClickAdd={() => handleClickAdd(unit)}
            key={`${unit.name}-${unit.size}`}
          />
        );
      })}
      <Button text="Cancel" onClick={() => goToDisplay(fromArmyList ? 'armyList' : 'armiesIndex')} />
    </section>
  );
};

export default UnitsIndex;
