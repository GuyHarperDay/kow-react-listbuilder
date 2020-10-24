import React, { useState, useEffect, useReducer } from 'react';
import Button from 'components/common/Button';
import UnitsIndex from 'components/views/UnitsIndex';
import UnitSelect from 'components/views/UnitSelect';
import ArmyList from 'components/views/ArmyList';
import { v4 as uuidv4 } from 'uuid';
import armiesData from '../../data/armies.json';
import calculateUnallocated from '../../helpers/unlocks';

const ArmiesIndex = () => {
  const [armies, setArmies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [display, setDisplay] = useState('armiesIndex');
  const [selectedArmy, setSelectedArmy] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [fromArmyList, setFromArmyList] = useState(null);
  const [unallocated, setUnallocated] = useState({});

  const initialArmyListState = [];
  const [armyListState, dispatch] = useReducer(reducer, initialArmyListState);

  function reducer(armyListState, action) {
    switch (action.type) {
      case 'addUnitToList':
        return addUnitToListDispatchFunction(armyListState, action);
      case 'editUnit':
        return editUnitDispatchFunction(armyListState, action);
      case 'deleteUnit':
        return deleteUnitDispatchFunction(armyListState, action);
      default:
        throw new Error();
    }
  }

  function addUnitToListDispatchFunction(armyListState, action) {
    const armyListIndex = armyListState.findIndex((armyList) => armyList.name === action.armyName);
    const selectedUnit = {
      unitId: action.unitId,
      unitDetails: action.unit,
      selectedUpgrades: [],
      unitCost: action.unit.cost,
      armyName: action.armyName,
    };
    if (armyListIndex === -1) {
      return [...armyListState, { name: action.armyName, units: [selectedUnit] }];
    } else {
      return armyListState.map((army, index) => {
        if (index !== armyListIndex) return army;
        return {
          ...army,
          units: [...army.units, selectedUnit],
        };
      });
    }
    // still need to update points values
  }

  function editUnitDispatchFunction(armyListState, action) {
    const armyListIndex = armyListState.findIndex((armyList) => armyList.name === action.unit.armyName);
    return armyListState.map((army, index) => {
      if (index !== armyListIndex) return army;
      return {
        ...army,
        units: army.units.map((unit) => {
          if (unit.id !== action.unit.id) return unit;
          return action.unit;
        }),
      };
    });
    // still need to update points values
  }

  function deleteUnitDispatchFunction(armyListState, action) {
    console.log('deleting unit');
    console.log('action in deleteDispatch - ', action);
    const armyListIndex = armyListState.findIndex((armyList) => armyList.name === action.unit.armyName);
    return armyListState.map((army, index) => {
      if (index !== armyListIndex) return army;
      return {
        ...army,
        units: army.units.filter((unit) => unit.unitId !== action.unit.unitId),
      };
    });
    // if last unit in army section, delete army section
    // if last unit in list, setFromArmyList to false
  }

  function init() {
    setIsLoaded(true);
    setArmies(armiesData);
    setDisplay('armiesIndex');
  }

  useEffect(init, []);
  useEffect(() => {
    const unallocatedObj = armyListState.reduce((unallocatedObj, army) => {
      unallocatedObj[army.name] = calculateUnallocated(army.units);
      return unallocatedObj;
    }, {});
    setUnallocated(unallocatedObj);
  }, [armyListState]);

  function handleArmyButtonClick(armyName) {
    setSelectedArmy(armyName);
    setDisplay('armyUnitsIndex');
  }

  function handleAddUnitToListWithArmyAndUnit(armyName, unit) {
    dispatch({ type: 'addUnitToList', armyName, unit, unitId: uuidv4() });
    setDisplay('armyList');
    // then go to army list display
  }

  function handleEditUnit(unit) {
    dispatch({ type: 'editUnit', unit });
    setDisplay('armyList');
    // fix: cancel after only clicking on one unit and not saving it
  }

  function handleDeleteUnit(unit) {
    dispatch({ type: 'deleteUnit', unit });
    setDisplay('armyList');
    // setDisplay to armyList or armiesIndex
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (display === 'armiesIndex') {
    // if flag is set that this view should be displayed
    return (
      <main>
        {armies.map((army, i) => {
          return <Button text={army.name} onClick={() => handleArmyButtonClick(army.name)} key={i} />;
        })}
      </main>
    );
  } else if (display === 'armyUnitsIndex') {
    return (
      <main>
        <UnitsIndex
          army={armies.find((army) => army.name === selectedArmy)}
          goToDisplay={setDisplay}
          selectUnit={setSelectedUnit}
          selectArmy={setSelectedArmy}
          fromArmyList={fromArmyList}
          unallocated={unallocated}
        />
      </main>
    );
  } else if (display === 'unitSelect' || display === 'deleteConfirm') {
    return (
      <main>
        <UnitSelect
          armyName={selectedArmy}
          unit={selectedUnit}
          goToDisplay={setDisplay}
          handleAddUnitToListWithArmyAndUnit={handleAddUnitToListWithArmyAndUnit}
          editingUnit={!!selectedUnit.unitId}
          handleEditUnit={handleEditUnit}
          handleDeleteUnit={handleDeleteUnit}
          deleteConfirm={display === 'deleteConfirm'}
        />
      </main>
    );
  } else if (display === 'armyList') {
    return (
      <main>
        <ArmyList
          armyList={armyListState}
          goToDisplay={setDisplay}
          setFromArmyList={setFromArmyList}
          selectUnit={setSelectedUnit}
        />
      </main>
    );
  }
};

export default ArmiesIndex;
