export const enrichArmyDataForHalpisRift = (armyData, planeSpells) => {
  return armyData.map((army) => {
    return {
      ...army,
      units: army.units.map((unit) => {
        const spellcasterLevel = unit.spellcaster;
        const isEligibleForPlaneSpells = spellcasterLevel && !unit.limit;
        if (isEligibleForPlaneSpells) {
          const availablePlaneSpells = planeSpells.reduce((accumulatedSpells, spell) => {
            spell.levels.forEach((spellLevel) => {
              accumulatedSpells.push({
                name: `${spell.name} (${spellLevel.n})`,
                cost: spellLevel.cost,
                limit: spell.limit,
                spellLevel: spellLevel.level,
              });
            });
            return accumulatedSpells;
          }, []);
          return { ...unit, options: [...unit.options, ...availablePlaneSpells] };
        } else {
          return unit;
        }
      }),
    };
  });
};
