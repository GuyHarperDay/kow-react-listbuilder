import React, { useState } from 'react';
import MultiUnit from 'components/unit/MultiUnit';
import Button from 'components/common/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const FactionUnitsIndex = ({ army, goToDisplay, selectUnit, selectArmy, fromArmyList, displaySelectOtherArmy }) => {
  // All the units in the selected faction

  const handleClickAdd = (unit) => {
    selectUnit(unit);
    selectArmy(army.name);
    goToDisplay('unitSelect');
    window.scrollTo(0, 0);
  };

  const mergedFactionList = [];
  army.units.forEach((unit) => {
    const mergedUnitIndex = mergedFactionList.findIndex((unitArr) => unitArr[0].name === unit.name);
    if (mergedUnitIndex === -1) {
      mergedFactionList.push([unit]);
    } else {
      mergedFactionList[mergedUnitIndex].push(unit);
    }
  });

  const [filteredMergedUnits, setFilteredMergedUnits] = useState(
    [...mergedFactionList].filter(
      (unitArr) =>
        ['Infantry', 'Heavy Infantry'].includes(unitArr[0].type) &&
        !['Hero', 'War Engine', 'Monster', 'Titan'].includes(unitArr[0].size)
    )
  );

  const handleDisplayOtherArmy = () => {
    goToDisplay('armiesIndex');
    window.scrollTo(0, 0);
  };

  const handleSelectTab = (label) => {
    console.log('label', label);
    const typesDict = {
      'Inf/Hv Inf': ['Infantry', 'Heavy Infantry'],
      'Cav/Cht': ['Cavalry', 'Chariot'],
      'Lg Inf/Mon Inf/Lg Cav': ['Large Infantry', 'Monstrous Infantry', 'Large Cavalry'],
    };
    const sizesDict = {
      Hero: ['Hero'],
      'War Eng': ['War Engine'],
      'Mon/Titan': ['Monster', 'Titan'],
    };
    const filteredUnits = [...mergedFactionList].filter((unitArr) => {
      if (typesDict[label]) {
        return (
          typesDict[label].includes(unitArr[0].type) &&
          !['Hero', 'War Engine', 'Monster', 'Titan'].includes(unitArr[0].size)
        );
      } else {
        return sizesDict[label].includes(unitArr[0].size);
      }
    });
    setFilteredMergedUnits(filteredUnits);
  };

  return (
    <section className="units-index">
      {displaySelectOtherArmy && <Button text="Select other army" onClick={handleDisplayOtherArmy} />}
      <Tabs className="units-index__tabs" onSelect={handleSelectTab} variant="tabs" defaultActiveKey="Inf/Hv Inf">
        {['Inf/Hv Inf', 'Cav/Cht', 'Lg Inf/Mon Inf/Lg Cav', 'Hero', 'War Eng', 'Mon/Titan'].map((unitType) => {
          return (
            <Tab className="units-index__tab" eventKey={unitType} title={unitType}>
              {filteredMergedUnits.length ? (
                filteredMergedUnits.map((unitArr, index) => {
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
                })
              ) : (
                <p>No units of this type in faction</p>
              )}
              {}
            </Tab>
          );
        })}
      </Tabs>
      <Button text="Cancel" onClick={() => goToDisplay(fromArmyList ? 'armyList' : 'armiesIndex')} variant="warning" />
    </section>
  );
};

export default FactionUnitsIndex;
