import React, { useContext } from 'react';
import UnitOptions from './UnitOptions';
import UnitArtefacts from './UnitArtefacts';
import { PlaneContext } from '../../contexts/PlaneContextProvider';
import { calculateAvailablePlaneSpells } from '../../helpers/parse-halpi';

const UnitFooter = ({ unit, view, selectOption, deselectOption, selectArtefact, availableArtefacts }) => {
  const selectedPlane = useContext(PlaneContext);

  const enrichedAvailableArtefacts =
    availableArtefacts && selectedPlane ? [...availableArtefacts, ...selectedPlane.artefacts] : availableArtefacts;

  const pointyWizardsHatSpells =
    selectedPlane &&
    [...calculateAvailablePlaneSpells(selectedPlane.spells, unit.unitDetails.spellcaster + 1)].filter(
      (spell) => !unit.unitDetails.options.find((allocatedSpell) => allocatedSpell.name === spell.name)
    );

  let enrichedOptions = unit.unitDetails.options;
  if (
    selectedPlane &&
    !unit.unitDetails.limit &&
    unit.selectedArtefacts.find((artefact) => artefact.name === "Pointy Wizard's Hat")
  ) {
    enrichedOptions = [...unit.unitDetails.options, ...pointyWizardsHatSpells];
  }

  const handleSelectArtefact = (artefact) => {
    if (pointyWizardsHatSpells) {
      const selectedPointyWizardsHatSpells = unit.selectedOptions.filter((option) =>
        pointyWizardsHatSpells.find((spell) => spell.name === option.name)
      );
      if (selectedPointyWizardsHatSpells.length && (!artefact || artefact.name !== "Pointy Wizard's Hat")) {
        selectedPointyWizardsHatSpells.forEach(async (spell) => {
          deselectOption(spell);
        });
      }
    }
    selectArtefact(artefact, 0);
  };

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
            possibleOptions={enrichedOptions}
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
            availableArtefacts={enrichedAvailableArtefacts}
            selectedArtefacts={unit.selectedArtefacts}
            view={view}
            selectArtefact={handleSelectArtefact}
            sizeModifier={unit.unitDetails.size}
          />
        )}
      </div>
    </div>
  );
};

export default UnitFooter;
