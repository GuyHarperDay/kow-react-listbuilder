import React from 'react';

const UnitOptions = ({ unit, view }) => {
  const unitDetails = unit.unitDetails ? unit.unitDetails : unit;

  return (
    <div className="unit-options">
      {view === 'unitSelect' && (
        <div className="unit-options--select">
          <p>
            <span className="unit-footer__label">Options: </span>
          </p>
          <ul>
            {unitDetails.options.map((option) => (
              <li key={option.name}>
                {option.name}: {option.cost}pts
              </li>
            ))}
          </ul>
        </div>
      )}
      {view === 'armyList' && (
        <div className="unit-options--select">
          <p>
            <span className="unit-footer__label">Options: </span>
          </p>
          <ul>
            {unitDetails.options.map((option) => (
              <li key={option.name}>
                {option.name}: {option.cost}pts
              </li>
            ))}
          </ul>
        </div>
      )}
      {view === 'factionUnitsIndex' && (
        <div className="unit-options--select">
          <p>
            <span className="unit-footer__label">Options: </span>
          </p>
          <ul>
            {unitDetails.options.map((option) => (
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
