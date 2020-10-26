import React from 'react';
import Unit from 'components/unit/Unit';
import Button from 'components/common/Button';
import UnlocksBanner from 'components/UnlocksBanner';
import DuplicatesBanner from 'components/DuplicatesBanner';

const ArmyList = ({
  armyList,
  goToDisplay,
  setFromArmyList,
  selectUnit,
  unallocated,
  points,
  tooManyDuplicates,
  overLimits,
}) => {
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
      {armyList.map((faction) => (
        <UnlocksBanner key={faction.name} armyName={faction.name} unallocated={unallocated} />
      ))}
      <DuplicatesBanner tooManyDuplicates={tooManyDuplicates} overLimits={overLimits} />
      {armyList.map((faction) => {
        return (
          <div key={faction.name}>
            <h2 className="army-list__section-heading">{faction.name}</h2>
            <p>{points[faction.name]} points</p>
            {faction.units.map((unit) => {
              return (
                <Unit
                  unit={unit}
                  key={unit.unitId}
                  displayEditButton={true}
                  handleClickEdit={() => handleEditUnitClick(unit)}
                  view={'armyList'}
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
