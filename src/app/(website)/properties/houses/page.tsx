'use client'

import React from 'react';
import { PropertyType } from '@components/website/property/models';
import IndexPageListing from '@components/website/property/IndexPageListing';

export default function HousePage(){

  return (
    <IndexPageListing propertyType={PropertyType.HOUSE} />
  );
};
