import React, { useContext } from 'react';
import UnitOptions from './UnitOptions';
import UnitArtefacts from './UnitArtefacts';
import { PlaneContext } from '../../contexts/PlaneContextProvider';

const UnitFooter = ({ unit, view, selectOption, deselectOption, selectArtefact, availableArtefacts }) => {
  const selectedPlane = useContext(PlaneContext);
  return (
    <div className="unit-footer">
      <div className="unit-footer__special">
        <p>
          <span className="unit-footer__label">Special: </span>
          {unit.unitDetails.specialRules}
        </p>
        <p>
          <span className="unit-footer__label">Keywords: </span>
          {unit.unitDetails.keywords}
        </p>
        {unit.unitDetails.spellcaster && (
          <p>
            <span className="unit-footer__label">Spellcaster: </span>
            {unit.unitDetails.spellcaster}
          </p>
        )}
        {view === 'factionUnitsIndex' && unit.unitDetails.options.length ? (
          <UnitOptions possibleOptions={unit.unitDetails.options} view={view} />
        ) : null}
        {view === 'armyList' && unit.selectedOptions.length ? (
          <UnitOptions selectedOptions={unit.selectedOptions} view={view} />
        ) : null}
        {view === 'unitSelect' && unit.unitDetails.options.length ? (
          <UnitOptions
            possibleOptions={unit.unitDetails.options}
            selectedOptions={unit.selectedOptions}
            view={view}
            selectOption={selectOption}
            deselectOption={deselectOption}
          />
        ) : null}
        {view === 'armyList' && unit.selectedArtefacts.length ? (
          <UnitArtefacts selectedArtefacts={unit.selectedArtefacts} view={view} />
        ) : null}
        {view === 'unitSelect' && !['Monster', 'War Engine', 'Titan'].includes(unit.unitDetails.size) && (
          <UnitArtefacts
            artefactsLimit={1}
            availableArtefacts={availableArtefacts}
            selectedArtefacts={unit.selectedArtefacts}
            view={view}
            selectArtefact={selectArtefact}
            sizeModifier={unit.unitDetails.size}
          />
        )}
      </div>
    </div>
  );
};

export default UnitFooter;
