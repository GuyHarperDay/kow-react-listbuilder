import React, { useState, useEffect, useReducer } from 'react';
import Button from 'components/common/Button';
import FactionUnitsIndex from 'components/views/FactionUnitsIndex';
import UnitSelect from 'components/views/UnitSelect';
import ArmyList from 'components/views/ArmyList';
import { v4 as uuidv4 } from 'uuid';
import armiesData from '../../data/armies.json';
import calculateUnallocated from '../../helpers/unlocks';
import calculatePointsTotal from '../../helpers/points';
import calculateDuplicates from '../../helpers/duplicates';

const ArmiesIndex = () => {
  const [armies, setArmies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [display, setDisplay] = useState('armiesIndex');
  const [selectedArmy, setSelectedArmy] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [fromArmyList, setFromArmyList] = useState(null);
  const [unallocated, setUnallocated] = useState({});
  const [points, setPoints] = useState({});
  const [tooManyDuplicates, setTooManyDuplicates] = useState(null);

  const initialArmyListState = [];

  const addUnitToListDispatchFunction = (armyListState, action) => {
    const armyListIndex = armyListState.findIndex((armyList) => armyList.name === action.armyName);
    const selectedUnit = {
      unitId: action.unitId,
      unitDetails: action.unit.unitDetails,
      selectedOptions: action.unit.selectedOptions,
      unitCost: action.unit.unitCost,
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
    // still need to set limits on number of duplicates and living legends
  };

  const editUnitDispatchFunction = (armyListState, action) => {
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
  };

  const deleteUnitDispatchFunction = (armyListState, action) => {
    const armyListIndex = armyListState.findIndex((armyList) => armyList.name === action.unit.armyName);
    const newArmylistState = armyListState.map((army, index) => {
      if (index !== armyListIndex) return army;
      return {
        ...army,
        units: army.units.filter((unit) => unit.unitId !== action.unit.unitId),
      };
    });
    const emptyArmy = newArmylistState.find((army) => army.units.length === 0);
    if (emptyArmy && selectedArmy === emptyArmy.name) {
      setFromArmyList(false);
      setSelectedArmy(null);
      setDisplay('armiesIndex');
    }
    return newArmylistState.filter((army) => army.units.length !== 0);
  };

  const reducer = (armyListState, action) => {
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
  };
  const [armyListState, dispatch] = useReducer(reducer, initialArmyListState);

  const init = () => {
    setIsLoaded(true);
    setArmies(armiesData);
    setDisplay('armiesIndex');
  };

  const processUnlocks = () => {
    const unallocated = armyListState.reduce((unallocatedObj, army) => {
      unallocatedObj[army.name] = calculateUnallocated(army.units);
      return unallocatedObj;
    }, {});
    setUnallocated(unallocated);
  };

  const processPoints = () => {
    const points = armyListState.reduce((pointsObj, army) => {
      pointsObj[army.name] = calculatePointsTotal(army.units);
      return pointsObj;
    }, {});
    setPoints(points);
  };

  const processDuplicates = () => {
    const pointsTotal = Object.keys(points).reduce((sum, key) => {
      return (sum += points[key]);
    }, 0);
    const isTooManyDuplicates = calculateDuplicates(
      pointsTotal,
      armyListState.reduce((flattenedUnits, army) => {
        return [...flattenedUnits, ...army.units];
      }, [])
    );
    setTooManyDuplicates(isTooManyDuplicates);
    console.log('isTooManyDuplicates', isTooManyDuplicates);
  };

  useEffect(init, []);
  useEffect(() => {
    processUnlocks();
    processPoints();
    processDuplicates();
    if (armyListState.length) setDisplay('armyList');
  }, [armyListState]);

  const handleArmyButtonClick = (armyName) => {
    setSelectedArmy(armyName);
    setDisplay('factionUnitsIndex');
  };

  const handleAddUnitToListWithArmyAndUnit = (armyName, unit) => {
    dispatch({ type: 'addUnitToList', armyName, unit, unitId: uuidv4() });
  };

  const handleEditUnit = (unit) => {
    dispatch({ type: 'editUnit', unit });
  };

  const handleDeleteUnit = (unit) => {
    dispatch({ type: 'deleteUnit', unit });
  };

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
  } else if (display === 'factionUnitsIndex') {
    return (
      <main>
        <FactionUnitsIndex
          army={armies.find((army) => army.name === selectedArmy)}
          goToDisplay={setDisplay}
          selectUnit={setSelectedUnit}
          selectArmy={setSelectedArmy}
          fromArmyList={fromArmyList}
          unallocated={unallocated}
          displaySelectOtherArmy={!!armyListState.length}
          tooManyDuplicates={tooManyDuplicates}
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
          editUnit={handleEditUnit}
          deleteUnit={handleDeleteUnit}
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
          unallocated={unallocated}
          points={points}
          tooManyDuplicates={tooManyDuplicates}
        />
      </main>
    );
  }
};

export default ArmiesIndex;
