"use client";

import React from "react";
import { PropertyType } from "@components/website/property/models";
import PropertyListingIndexPage from "@components/website/property/PropertyListingIndexPage";

export default function HousePage() {
  return <PropertyListingIndexPage propertyType={PropertyType.HOUSE} />;
}
