import React from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const UnitOptions = ({ view, possibleOptions, selectedOptions, selectOption, deselectOption }) => {
  const handleChange = (option) => {
    selectedOptions.find((selectedOption) => selectedOption.name === option.name)
      ? deselectOption(option)
      : selectOption(option);
  };

  const isChecked = (option) => {
    return !!(selectedOptions && selectedOptions.find((selectedOption) => selectedOption.name === option.name));
  };

  return (
    <div className="unit-options">
      {view === 'unitSelect' && (
        <div className="unit-options--select">
          <p>
            <span className="unit-options__label--select">Options: </span>
          </p>
          <ul className="unit-options__list--select">
            {possibleOptions.map((option, index) => (
              <li key={option.name}>
                <ToggleButtonGroup type="checkbox">
                  <ToggleButton
                    className="unit-options__toggle"
                    checked={isChecked(option)}
                    onChange={() => handleChange(option)}
                    id={`${option.name}-${index}`}
                    variant={isChecked(option) ? 'success' : 'outline-success'}
                    size="sm"
                  >
                    {isChecked(option) ? 'Deselect' : 'Select'}
                  </ToggleButton>
                </ToggleButtonGroup>
                <label htmlFor={`${option.name}-${index}`}>
                  {option.name}: {option.cost}pts
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
      {view === 'armyList' && (
        <div className="unit-options--select">
          <p>
            <span className="unit-footer__label">Options: </span>
            {selectedOptions.map((option, index) => (
              <span key={option.name}>
                {option.name} ({option.cost}pts)
                {index < selectedOptions.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      )}
      {view === 'factionUnitsIndex' && (
        <div className="unit-options--select">
          <p>
            <span className="unit-footer__label">Options: </span>
          </p>
          <ul>
            {possibleOptions.map((option) => (
              <li key={option.name}>
                {option.name}: {option.cost}pts
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UnitOptions;
