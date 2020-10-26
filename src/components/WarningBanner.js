import React from 'react';
import Banner from 'components/common/Banner';

const WarningBanner = ({ armyName = null, unallocated = {}, tooManyDuplicates = null }) => {
  const tooManyHWMT = unallocated[armyName] && unallocated[armyName].hwmt;
  const tooManyTroopsOrIrregular = unallocated[armyName] && unallocated[armyName].troopOrIrregular;

  return (
    <div className="unlocks-banner">
      {tooManyHWMT && (
        <Banner text="Not enough unlocks for the amount of Heroes/War Engines/Monsters/Titans in your list" />
      )}
      {tooManyTroopsOrIrregular && (
        <Banner text="Not enough unlocks for the amount of Troops or Irregular Units in your list" />
      )}
      {tooManyDuplicates && (
        <Banner text="Too many Heroes/War Engines/Monsters/Titans of the same type for the current points total" />
      )}
    </div>
  );
};

export default WarningBanner;
