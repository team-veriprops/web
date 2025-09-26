import React from 'react';
import RecommendedSimilarPropertiesInArea from './recommendations/RecommendedSimilarPropertiesInArea';
import RecommendedLatestPropertiesInArea from './recommendations/RecommendedLatestPropertiesInArea';

export const RecommendedPropertiesComponent = () => {

  return (
    <div className="space-y-8">
      {/* Recommended Properties */}
      <RecommendedSimilarPropertiesInArea />

      {/* New Listings */}
      <RecommendedLatestPropertiesInArea />
    </div>
  );
};
