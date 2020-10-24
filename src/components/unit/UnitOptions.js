import React from 'react';

const UnitOptions = ({ unit, view }) => {
  return (
    <div className="unit-options">
      {view === 'unitSelect' && (
        <div className="unit-options--select">
          <p>
            <span className="unit-footer__label">Options: </span>
          </p>
        </div>
      )}
      {view === 'armyList' && <p>hello world</p>}
      {view === 'factionUnitsIndex' && <p>hello world</p>}
    </div>
  );
};

export default UnitOptions;
