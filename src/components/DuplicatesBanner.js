import React from 'react';
import Banner from 'components/common/Banner';

const DuplicatesBanner = ({ tooManyDuplicates = null }) => {
  return (
    <div className="duplicates-banner">
      {tooManyDuplicates && (
        <Banner text="Too many Heroes/War Engines/Monsters/Titans of the same type for the current points total" />
      )}
    </div>
  );
};

export default DuplicatesBanner;
