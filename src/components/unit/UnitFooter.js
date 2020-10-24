import React from 'react';

const UnitFooter = ({ unit }) => {
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
      </div>
    </div>
  );
};

export default UnitFooter;
