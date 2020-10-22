import React from 'react';
import Button from 'components/common/Button.js';

const UnitRow = ({ unit, displayEditButton, handleClickEdit }) => {
  const unitDetails = unit.unitDetails ? unit.unitDetails : unit;

  return (
    <div className="unit-row">
      <div className="unit-row__head">
        <p>{unitDetails.name}</p>
        {displayEditButton && <Button text="Edit" onClick={() => handleClickEdit(unit)} />}
        <p>{unitDetails.type}</p>
      </div>
      <table className="unit-row__body">
        <tbody>
          <tr>
            <th>Unit size</th>
            <th>Sp</th>
            <th>Me</th>
            <th>Ra</th>
            <th>De</th>
            <th>H</th>
            <th>US</th>
            <th>Att</th>
            <th>Ne</th>
            <th>Pts</th>
          </tr>
          <tr>
            <td>{`${unitDetails.size} (${unitDetails.modelCount})`}</td>
            <td>{unitDetails.speed}</td>
            <td>{unitDetails.melee}</td>
            <td>{unitDetails.ranged}</td>
            <td>{unitDetails.defence}</td>
            <td>{unitDetails.height}</td>
            <td>{unitDetails.unitStrength}</td>
            <td>{unitDetails.attacks}</td>
            <td>{unitDetails.nerve}</td>
            <td>{unitDetails.cost}</td>
          </tr>
        </tbody>
      </table>
      <div className="unit-row__special">
        <p>
          <span className="unit-row__label">Special: </span>
          {unitDetails.specialRules}
        </p>
        <p>
          <span className="unit-row__label">Keywords: </span>
          {unitDetails.keywords}
        </p>
      </div>
    </div>
  );
};

export default UnitRow;
