import { PropertyAssetPhotoCategory } from "@components/website/property/PropertyDetails/models";
import { BaseQueryDto, PageRequest } from "types/models";

export enum TransactionCurrency {
  NGN = "NGN",
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export enum Language {
  ENGLISH = "en-US",
  FRENCH = "FR",
}

export class Money {
  private value: number;
  private currency: TransactionCurrency;

  constructor(value: number = 0.0, currency: TransactionCurrency) {
    this.value = value;
    this.currency = currency;
  }

  static from(obj: { value: number; currency: TransactionCurrency }): Money {
    return new Money(obj.value, obj.currency);
  }

  getValue(): number {
    return this.value;
  }

  getCurrency(): TransactionCurrency {
    return this.currency;
  }

  plus(money: Money): Money {
    this.validateCurrency(money.getCurrency());
    this.validateNegativeCredit(money.getValue());
    this.value += money.getValue();
    return this;
  }

  minus(money: Money): Money {
    this.validateDebitBalance(money.getValue());
    this.validateCurrency(money.getCurrency());
    this.validateNegativeDebit(money.getValue());
    this.value -= money.getValue();
    return this;
  }

  compare(other: Money): number {
    this.validateCurrency(other.getCurrency());

    if (isNaN(this.value) || isNaN(other.getValue())) return NaN;
    if (this.value < other.getValue()) return -1;
    if (this.value > other.getValue()) return 1;
    return 0;
  }

  isLessThan(other: Money): boolean {
    return this.compare(other) < 0;
  }

  isLessThanEquals(other: Money): boolean {
    return this.compare(other) <= 0;
  }

  isGreaterThan(other: Money): boolean {
    return this.compare(other) > 0;
  }

  isGreaterThanEquals(other: Money): boolean {
    return this.compare(other) >= 0;
  }

  isEqualTo(other: Money): boolean {
    return this.compare(other) === 0;
  }

  private validateCurrency(currency: TransactionCurrency): void {
    if (this.currency !== currency) {
      throw new Error("Money exception: currency mismatch");
    }
  }

  private validateNegativeCredit(amount: number): void {
    if (amount < 0) {
      throw new Error("Money exception: negative credit amount");
    }
  }

  private validateNegativeDebit(amount: number): void {
    if (amount < 0) {
      throw new Error("Money exception: negative debit amount");
    }
  }

  private validateDebitBalance(amount: number): void {
    if (this.value < 0 || this.value < amount) {
      throw new Error("Money exception: insufficient balance");
    }
  }
}

export interface Measurement {
  value: number;
  unit: MeasurementUnit;
}

export enum MeasurementUnit {
  METER = "meter",
  SQM = "sqm",
  FEET = "feet",
  SQF = "sqf",
}

export enum PropertyZoning {
  RESIDENTIAL = "residential",
  COMMERCIAL = "commercial",
  MIXED = "mixed",
  AGRICULTURAL = "agricultural",
  INDUSTRIAL = "industrial",
}

export enum HomeType {
  APARTMENT = "apartment",
  DUPLEX = "duplex",
  BUNGALOW = "bungalow",
  TERRACE = "terrace",
  DETACHED = "detached",
  SEMI_DETACHED = "semiDetached",
  MANSION = "mansion",
  SHORTLET = "shortlet",
}

export enum LandType {
  RESIDENTIAL = "residential",
  COMMERCIAL = "commercial",
  AGRICULTURAL = "agricultural",
  INDUSTRIAL = "industrial",
  MIXED = "mixed",
  ALLOCATION = "allocation",
  ESTATE_PLOT = "estatePlot",
  WATER_FRONT = "waterfront",
  CORNER_PIECE = "cornerPiece",
}

export enum PropertyType {
  LAND = "land",
  HOUSE = "house",
  SERVICE = "service",
}

export enum RoadState {
  PAVED = "paved",
  UNPAVED = "unpaved",
}

export enum LandTitle {
  C_OF_O = "C of O",
  GOVERNOR_CONSENT = "Governor's Consent",
  DEED_OF_ASSIGNMENT = "Deed of Assignment",
  GAZETTE = "Gazette",
  EXCISION = "Excision",
  SURVEY_PLAN = "Survey Plan",
  REGISTERED_TITLE = "Registered Title",
}

export enum PropertyStage {
  COMPLETED = "Completed",
  CLEARED = "Cleared",
  FENCED = "Fenced",
  BARE_LAND = "Bare land",
  GATED_ESTATE = "Gated estate",
}

export interface NearbyPlaces {
  schools: Array<{ name: string; distance: Measurement }>;
  hospitals: Array<{ name: string; distance: Measurement }>;
  places: Array<{ name: string; distance: Measurement }>;
  transit: Array<{ name: string; distance: Measurement }>;
}

export interface Image {
  title?: string;
  url: string;
  category?: PropertyAssetPhotoCategory;
}

export interface BaseProperty {
  slug: string;
  title: string;
  short_description: string;
  description: string;
  type: PropertyType;
  images: Image[];
  // title_docs: LandTitle[];
  price: Money;
  plot_size: Measurement;
  price_per_sqm: Money;
  days_on_veriprops?: string;
  rating: number;
  reviews_count: number;
  location: {
    address: string;
    country: string;
    state: string;
    city: string;
    grouping_city: string;
    area: string;
    coordinates?: { lat: number; lng: number };
  };
  utilities?: {
    electricity: boolean;
    water: boolean;
    road: RoadState;
    drainage: boolean;
    waste_disposal: boolean;
    internet: boolean;
  };
  verification?: {
    verified: boolean;
    title_docs: LandTitle[];
    zoning: PropertyZoning;
    development_stage: PropertyStage;
  };
  highlights?: string[];
  nearby_places?: NearbyPlaces;
  owner?: User;
  created_at: string;
}

/** House-specific */
export interface HouseProperty extends BaseProperty {
  home_type: HomeType;
  bedrooms: number;
  bathrooms: number;
  kitchens?: number;
  living_areas?: number;
  dining_areas?: number;
  other_rooms?: number;
  year_built?: number;
  year_last_renovated?: number;
  interior_description?: {
    bedrooms: string;
    bathrooms: string;
    flooring: string;
    kitchens: string;
    living_areas: string;
    dining_areas: string;
    other_rooms: string;
  };
  exterior_description?: {
    lot_size: Measurement;
    garden: boolean;
    fence: string;
    balcony: boolean;
  };
  parking?: {
    spaces: number;
    visitor_parking: boolean;
    garage_type: string;
    covered: boolean;
    street: boolean;
  };
  amenities?: string[];
}

/** Land-specific */
export interface LandProperty extends BaseProperty {
  land_type: LandType;
}

/** Unified Property type */
export interface Property extends HouseProperty, LandProperty{}

export interface Service {
  id: string;
  slug: string;
  title: string;
  provider: string;
  price: Money;
  duration: string;
  rating: number;
  images: string[];
  short_description: string;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type CommonFilters = {
  price_min?: number;
  price_max?: number;
  development_stage?: PropertyStage[];
  sort:
    | "recommended"
    | "newest"
    | "priceAsc"
    | "priceDesc"
    | "plotSize"
    | "lotSize"
    | "pricePerSqm";
  layout: "split" | "map" | "grid" | "list";
  title_docs?: string[];
  utilities?: {
    electricity?: boolean;
    water?: boolean;
    road?: RoadState;
    drainage?: boolean;
  };
  proximity?: { categories: string[]; distanceKm: number };
  zoning?: Array<PropertyZoning>;
};

export type HouseFilters = CommonFilters & {
  bedrooms?: { min?: number; max?: number } | "any" | "studio";
  bathrooms?: 1 | 1.5 | 2 | 2.5 | 3 | 4 | 0; // 0 means Any
  home_types?: Array<HomeType>;
};

export type LandFilters = CommonFilters & {
  land_types?: Array<LandType>;
};

export type PropertyFilters = HouseFilters | LandFilters;












// Enums
export enum PropertyStatus {
  CREATED = "created",
  COMING_SOON = "coming soon",
  NEW_LISTING = "new listing",
  UNDER_OFFER = "under offer",
  SOLD = "sold",
}

export enum VerificationStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  REJECTED = "rejected",
}

// Base Interfaces
export interface PropertyBaseDto {
  title: string;
  description: string;
}

// Create DTO
export interface CreatePropertyDto extends PropertyBaseDto {}

// Update DTO (full override)
export interface UpdatePropertyDto extends PropertyBaseDto {}

// Partial Update DTO
export interface PartialUpdatePropertyDto {
  status?: PropertyStatus | null;
  old_status?: PropertyStatus | null;
  active?: boolean | null;
  date_first_activated?: Date | null;
  notes?: string | null;
  verification_status?: VerificationStatus | null;
}

// // Paging + Query Base (assuming these exist in your codebase)
// export interface PageRequest {
//   page?: number;
//   size?: number;
// }

// export interface BaseQueryDto {
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
// }

// Search DTO
export interface SearchPropertyDto extends PageRequest, BaseQueryDto {
  title?: string | null;
  description?: string | null;
  user_id?: string | null;
  status?: PropertyStatus | null;
  type: PropertyType;
  active?: boolean | null;
  verification_status?: VerificationStatus | null;
  grouping_city?: string;




  price_min?: number;
  price_max?: number;
  development_stage?: PropertyStage[];
  sort:
    | "recommended"
    | "newest"
    | "priceAsc"
    | "priceDesc"
    | "plotSize"
    | "lotSize"
    | "pricePerSqm";
  layout: "split" | "map" | "grid" | "list";
  title_docs?: string[];
  utilities?: {
    electricity?: boolean;
    water?: boolean;
    road?: RoadState;
    drainage?: boolean;
  };
  proximity?: { categories: string[]; distanceKm: number };
  zoning?: Array<PropertyZoning>;
  
  bedrooms?: { min?: number; max?: number } | "any" | "studio";
  bathrooms?: 1 | 1.5 | 2 | 2.5 | 3 | 4 | 0; // 0 means Any
  home_types?: Array<HomeType>;
  
  land_types?: Array<LandType>;
}













// Query DTO (combination of Create + PartialUpdate + BaseQuery)
export interface QueryPropertyDto
  extends CreatePropertyDto,
    PartialUpdatePropertyDto,
    BaseQueryDto, Property {}

export interface QueryPropertyDetailsDto extends QueryPropertyDto {}


export interface QueryCityGroupedPropertiesDto {
  city: string;
  properties: Property[];
}
