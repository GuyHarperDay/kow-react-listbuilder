import React from 'react';
import Button from 'components/common/Button.js';

const UnitsIndex = ({ units, handleClickAdd }) => {
  return (
    <div className="unit-row">
      <div className="unit-row__head">
        <p>{units[0].name}</p>
        <p>{units[0].type}</p>
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
          {units.map((unit) => (
            <tr key={`${unit.name}-${unit.size}`}>
              <td>{`${unit.size} (${unit.modelCount})`}</td>
              <td>{unit.speed}</td>
              <td>{unit.melee}</td>
              <td>{unit.ranged}</td>
              <td>{unit.defence}</td>
              <td>{unit.height}</td>
              <td>{unit.unitStrength}</td>
              <td>{unit.attacks}</td>
              <td>{unit.nerve}</td>
              <td>{unit.cost}</td>
              <td>
                <Button text="Add" onClick={() => handleClickAdd(unit)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="unit-row__special">
        <p>
          <span className="unit-row__label">Special: </span>
          {units[0].specialRules}
        </p>
        <p>
          <span className="unit-row__label">Keywords: </span>
          {units[0].keywords}
        </p>
      </div>
    </div>
  );
};

export default UnitsIndex;
