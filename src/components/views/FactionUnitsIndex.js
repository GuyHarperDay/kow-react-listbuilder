import React from 'react';
import MultiUnit from 'components/unit/MultiUnit';
import Button from 'components/common/Button';

const FactionUnitsIndex = ({
  army,
  goToDisplay,
  selectUnit,
  selectArmy,
  fromArmyList,
  unallocated,
  displaySelectOtherArmy,
  tooManyDuplicates,
}) => {
  // All the units in the selected faction

  function handleClickAdd(unit) {
    selectUnit(unit);
    selectArmy(army.name);
    goToDisplay('unitSelect');
    window.scrollTo(0, 0);
  }

  const mergedFactionList = [];
  army.units.forEach((unit) => {
    const mergedUnitIndex = mergedFactionList.findIndex((unitArr) => unitArr[0].name === unit.name);
    if (mergedUnitIndex === -1) {
      mergedFactionList.push([unit]);
    } else {
      mergedFactionList[mergedUnitIndex].push(unit);
    }
  });

  const handleDisplayOtherArmy = () => {
    goToDisplay('armiesIndex');
    window.scrollTo(0, 0);
  };

  return (
    <section className="units-index">
      {displaySelectOtherArmy && <Button text="Select other army" onClick={handleDisplayOtherArmy} />}
      {mergedFactionList.map((unitArr, index) => {
        return (
          <MultiUnit
            units={unitArr.map((unit) => ({
              unitDetails: { ...unit },
              selectedOptions: [],
              unitCost: unit.cost,
              selectedArtefacts: [],
            }))}
            addUnit={handleClickAdd}
            key={unitArr[0].name}
            view={'factionUnitsIndex'}
          />
        );
      })}
      <Button text="Cancel" onClick={() => goToDisplay(fromArmyList ? 'armyList' : 'armiesIndex')} variant="warning" />
    </section>
  );
};

export default FactionUnitsIndex;
