import React from 'react';
import MultiUnitRow from 'components/MultiUnitRow';
import Button from 'components/common/Button';
import UnlocksBanner from 'components/UnlocksBanner';

const UnitsIndex = ({ army, goToDisplay, selectUnit, selectArmy, fromArmyList, unallocated }) => {
  // All the units in the selected faction

  function handleClickAdd(unit) {
    selectUnit(unit);
    selectArmy(army.name);
    goToDisplay('unitSelect');
  }

  const displaySelectOtherArmy = true;

  const mergedFactionList = [];
  army.units.forEach((unit) => {
    const mergedUnitIndex = mergedFactionList.findIndex((unitArr) => unitArr[0].name === unit.name);
    if (mergedUnitIndex === -1) {
      mergedFactionList.push([unit]);
    } else {
      mergedFactionList[mergedUnitIndex].push(unit);
    }
  });

  return (
    <section className="units-index">
      {displaySelectOtherArmy && <Button text="Select other army" onClick={() => goToDisplay('armiesIndex')} />}
      <UnlocksBanner armyName={army.name} unallocated={unallocated} />
      {mergedFactionList.map((unitArr, index) => {
        return <MultiUnitRow units={unitArr} handleClickAdd={(u) => handleClickAdd(u)} key={unitArr[0].name} />;
      })}
      <Button text="Cancel" onClick={() => goToDisplay(fromArmyList ? 'armyList' : 'armiesIndex')} />
    </section>
  );
};

export default UnitsIndex;
