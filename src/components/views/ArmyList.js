import React from 'react';
import UnitRow from 'components/UnitRow';
import Button from 'components/common/Button';

const ArmyList = ({ armyList, goToDisplay, setFromArmyList, selectUnit }) => {
  // The list the user has been building

  function handleAddUnitClick() {
    goToDisplay('armyUnitsIndex');
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
          <div>
            <h2 class="army-list__section-heading">{faction.name}</h2>
            <p>{faction.cost}</p>
            {faction.units.map((unit) => {
              return (
                <UnitRow
                  unit={unit}
                  key={unit.id}
                  displayAddButton={false}
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
