import React from 'react';
import UnitOptions from './UnitOptions';

const UnitFooter = ({ unit, view }) => {
  const unitDetails = unit.unitDetails ? unit.unitDetails : unit;

  return (
    <div className="unit-footer">
      <div className="unit-footer__special">
        <p>
          <span className="unit-footer__label">Special: </span>
          {unitDetails.specialRules}
        </p>
        <p>
          <span className="unit-footer__label">Keywords: </span>
          {unitDetails.keywords}
        </p>
        {unitDetails.spellcaster && (
          <p>
            <span className="unit-footer__label">Spellcaster: </span>
            {unitDetails.spellcaster}
          </p>
        )}
        {unitDetails.options.length && <UnitOptions unit={unit} view={view} />}
      </div>
    </div>
  );
};

export default UnitFooter;
