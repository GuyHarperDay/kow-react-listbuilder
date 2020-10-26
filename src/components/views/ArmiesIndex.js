import React from 'react';
import Button from 'components/common/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ArmiesIndex = ({ armies, handleArmyButtonClick }) => {
  return (
    <main>
      <div className="d-flex">
        {armies
          .filter((army) => army.alignment === 'Good')
          .map((army, i) => (
            <Button text={army.name} onClick={() => handleArmyButtonClick(army.name)} key={i} variant="success" />
          ))}
      </div>
      <div className="d-flex">
        {armies
          .filter((army) => army.alignment === 'Neutral')
          .map((army, i) => (
            <Button text={army.name} onClick={() => handleArmyButtonClick(army.name)} key={i} variant="warning" />
          ))}
      </div>
      <div className="d-flex">
        {armies
          .filter((army) => army.alignment === 'Evil')
          .map((army, i) => (
            <Button text={army.name} onClick={() => handleArmyButtonClick(army.name)} key={i} variant="danger" />
          ))}
      </div>
    </main>
  );
};

export default ArmiesIndex;
