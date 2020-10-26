import React, { useState } from 'react';
import Unit from 'components/unit/Unit';
import Button from 'components/common/Button';

const UnitSelect = ({
  unit,
  armyName,
  goToDisplay,
  handleAddUnitToListWithArmyAndUnit,
  editingUnit,
  editUnit,
  deleteUnit,
  deleteConfirm,
}) => {
  const [enrichedUnit, setEnrichedUnit] = useState(
    editingUnit && !unit.unitDetails
      ? { unitDetails: { ...unit }, selectedOptions: [], unitCost: unit.cost }
      : { ...unit }
  );

  const handleCancelClick = () => {
    goToDisplay(editingUnit ? 'armyList' : 'factionUnitsIndex');
  };

  const handleSaveClick = () => {
    editingUnit ? editUnit(enrichedUnit) : handleAddUnitToListWithArmyAndUnit(armyName, enrichedUnit);
  };

  const handleSelectOption = (option) => {
    const previousEnrichedUnit = { ...enrichedUnit };
    setEnrichedUnit({
      ...previousEnrichedUnit,
      selectedOptions: [...previousEnrichedUnit.selectedOptions, option],
      unitCost:
        previousEnrichedUnit.unitDetails.cost +
        [...previousEnrichedUnit.selectedOptions, option].reduce((sum, o) => sum + o.cost, 0),
    });
  };

  const handleDeselectOption = (option) => {
    const previousEnrichedUnit = { ...enrichedUnit };
    setEnrichedUnit({
      ...previousEnrichedUnit,
      selectedOptions: previousEnrichedUnit.selectedOptions.filter(
        (selectedOption) => selectedOption.name !== option.name
      ),
      unitCost:
        previousEnrichedUnit.unitDetails.cost +
        previousEnrichedUnit.selectedOptions
          .filter((selectedOption) => selectedOption.name !== option.name)
          .reduce((sum, o) => sum + o.cost, 0),
    });
  };

  const unitDetails = unit.unitDetails ? unit.unitDetails : unit;

  if (!deleteConfirm) {
    return (
      <section className="unit-select">
        <Unit
          unit={enrichedUnit}
          displayEditButton={false}
          view="unitSelect"
          selectOption={handleSelectOption}
          deselectOption={handleDeselectOption}
        />
        <Button text="Save" onClick={handleSaveClick} />
        {editingUnit ? <Button text="Delete" onClick={() => goToDisplay('deleteConfirm')} /> : null}
        <Button text="Cancel" onClick={handleCancelClick} />
      </section>
    );
  } else {
    return (
      <section className="delete-confirm">
        <p>Delete this unit?</p>
        <p>{unitDetails.name}</p>
        <Button text="Delete" onClick={() => deleteUnit(unit)} />
        <Button text="Cancel" onClick={() => goToDisplay('unitSelect')} />
      </section>
    );
  }
};

export default UnitSelect;
