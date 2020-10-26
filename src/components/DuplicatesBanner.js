import React from 'react';
import Banner from 'components/common/Banner';

const DuplicatesAndLimitsBanner = ({ tooManyDuplicates = null, overLimits = null }) => {
  return (
    <div className="duplicates-and-limits-banner">
      {tooManyDuplicates && (
        <Banner text="Too many Heroes/War Engines/Monsters/Titans of the same type for the current points total" />
      )}
      {overLimits && (
        <Banner text="You are over your limit on one or more living legend units, or units with the same living legend upgrade" />
      )}
    </div>
  );
};

export default DuplicatesAndLimitsBanner;
