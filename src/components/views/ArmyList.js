import React from 'react';
import UnitRow from 'components/unit/Unit';
import Button from 'components/common/Button';
import UnlocksBanner from 'components/UnlocksBanner';

const ArmyList = ({ armyList, goToDisplay, setFromArmyList, selectUnit, unallocated }) => {
  // The list the user has been building

  function handleAddUnitClick() {
    goToDisplay('factionUnitsIndex');
    setFromArmyList(true);
  }

  function handleEditUnitClick(unit) {
    selectUnit(unit);
    goToDisplay('unitSelect');
    setFromArmyList(true);
  }

  return (
    <section className="army-list">
      {armyList.map((faction) => {
        return (
          <div key={faction.name}>
            <UnlocksBanner armyName={faction.name} unallocated={unallocated} />
            <h2 className="army-list__section-heading">{faction.name}</h2>
            <p>{faction.cost}</p>
            {faction.units.map((unit) => {
              return (
                <UnitRow
                  unit={unit}
                  key={unit.unitId}
                  displayEditButton={true}
                  handleClickEdit={() => handleEditUnitClick(unit)}
                />
              );
            })}
          </div>
        );
      })}
      <Button text="Add another unit" onClick={handleAddUnitClick} />
    </section>
  );
};

export default ArmyList;
