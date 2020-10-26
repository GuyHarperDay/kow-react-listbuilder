import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const UnitArtefacts = ({ view, availableArtefacts, selectArtefact, selectedArtefacts, sizeModifier, limit = 1 }) => {
  const filteredArtefacts =
    availableArtefacts &&
    availableArtefacts.filter((artefact) => sizeModifier === 'Hero' || artefact.type === 'common');

  const handleSelect = (artefactName) => {
    if (artefactName === 'None') {
      selectArtefact(null, 0);
    } else {
      const selectedArtefact = availableArtefacts.find((artefact) => artefact.name === artefactName);
      selectArtefact({ name: selectedArtefact.name, cost: selectedArtefact.cost[sizeModifier] }, 0);
    }
  };

  return (
    <div className="unit-artefacts">
      {view === 'unitSelect' && (
        <div className="unit-artefacts--select">
          <DropdownButton onSelect={handleSelect} className="unit-artefacts__dropdown" title="Artefact" size="sm">
            {filteredArtefacts
              .sort((a, b) => a.cost[sizeModifier] - b.cost[sizeModifier])
              .map((artefact) => (
                <Dropdown.Item key={artefact.name} eventKey={artefact.name} as="button">
                  {artefact.name} ({artefact.cost[sizeModifier]}pts)
                </Dropdown.Item>
              ))}
          </DropdownButton>
          <p>
            {selectedArtefacts[0] &&
              `${selectedArtefacts[0].name} (${selectedArtefacts[0] && selectedArtefacts[0].cost}pts)`}
          </p>
        </div>
      )}
      {view === 'armyList' && (
        <div className="unit-artefacts--select">
          <p>
            <span className="unit-footer__label">Artefact{limit !== 1 ? 's' : ''}: </span>
            {selectedArtefacts.map((artefact, index) => (
              <span key={artefact.name}>
                {artefact.name} ({artefact.cost}pts)
                {index < selectedArtefacts.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default UnitArtefacts;