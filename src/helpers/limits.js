const calculateUnitLimits = (units) => {
  return units.reduce((overLimit, unit) => {
    return (
      overLimit ||
      (unit.unitDetails.limit &&
        units.filter((u) => u.unitDetails.name === unit.unitDetails.name).length > unit.unitDetails.limit)
    );
  }, false);
};

export default calculateUnitLimits;
