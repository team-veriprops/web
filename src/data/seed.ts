// Veriprops Mock Data - Property Marketplace
// export interface Property {
//   id: string;
//   slug: string;
//   type: "House" | "Land";
//   title: string;
//   short_description: string;
//   images: string[];
//   price: number;
//   currency: string;
//   rating: number;
//   reviews_count: number;
//   location: {
//     city: string;
//     area: string;
//     lat: number;
//     lng: number;
//   };
//   verified: boolean;
//   bedrooms?: number;
//   plot_size_sqm: number;
//   owner: {
//     id: string;
//     name: string;
//     avatar: string;
//   };
//   created_at: string;
// }

// export interface Service {
//   id: string;
//   slug: string;
//   title: string;
//   provider: string;
//   price: number;
//   currency: string;
//   duration: string;
//   rating: number;
//   images: string[];
//   short_description: string;
//   created_at: string;
// }

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
// }


import { Property, PropertyType, MeasurementUnit, Service, User, RoadState, HomeType, PropertyZoning, LandTitle, PropertyStage, NearbyPlaces, LandType, TransactionCurrency, Money, HouseFilters, LandFilters, HouseProperty, LandProperty } from "@components/website/property/models";
import { PropertyAssetPhotoCategory } from "@components/website/property/PropertyDetails/models";

const nearbyPlacesMock: NearbyPlaces = {
  schools: [
    { name: "Greenwood International School", distance: { value: 350, unit: MeasurementUnit.METER } },
    { name: "Sunrise Academy", distance: { value: 0.8 * 1000, unit: MeasurementUnit.METER } },
    { name: "Lagos Model College", distance: { value: 1.5 * 1000, unit: MeasurementUnit.METER } },
  ],
  hospitals: [
    { name: "St. Mary's Hospital", distance: { value: 600, unit: MeasurementUnit.METER } },
    { name: "City General Clinic", distance: { value: 1.2 * 1000, unit: MeasurementUnit.METER } },
  ],
  places: [
    { name: "Mega Shopping Mall", distance: { value: 2 * 1000, unit: MeasurementUnit.METER } },
    { name: "Central Mosque", distance: { value: 450, unit: MeasurementUnit.METER } },
    { name: "Community Park", distance: { value: 1.1 * 1000, unit: MeasurementUnit.METER } },
  ],
  transit: [
    { name: "Lekki Bus Terminal", distance: { value: 700, unit: MeasurementUnit.METER } },
    { name: "Metro Rail Station", distance: { value: 1.8 * 1000, unit: MeasurementUnit.METER } },
    { name: "Okada Spot", distance: { value: 300, unit: MeasurementUnit.METER } },
  ],
};

// export const propertyDetails: Property[] = [
//   {
//   id: "prop-123",
//   slug: "prop_001",
//   type: PropertyType.HOUSE,
//   title: "Luxury 4-Bedroom Duplex in Lekki Phase 1",
//   short_description: "Stunning 4-bedroom duplex in the heart of Lekki Phase 1.",
//   description: "Discover this stunning 4-bedroom duplex in the heart of Lekki Phase 1. Built with premium materials and modern finishes, this home offers the perfect blend of luxury and comfort. The spacious layout features an open-plan living area, modern kitchen with island, and a master suite with walk-in closet. Located in a secure, gated community with 24/7 security and excellent infrastructure.",
//   images: [
//     {url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bedroom},
//     {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bedroom},
//     {url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bedroom},
//     {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bedroom},
//     {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom},
//     {url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom},
//     {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom},
//     {url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom},
//     {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Kitchen},
//     {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Kitchen},
//     {url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Kitchen},
//     {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Living},
//     {url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Living},
//     {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Living},
//     {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Living},
//     {url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Dining},
//     {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Dining},
//     {url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Dining},
//     {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Dining},
//     {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Amenities},
//     {url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Amenities},
//     {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Amenities},
//     {url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Exterior},
//     {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Exterior},
//     {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Exterior},
//     {url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Exterior},
//     {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.OtherRooms},
//     {url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.OtherRooms},
//     {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.OtherRooms},
//     {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.OtherRooms},
//   ],
//   price: Money.from({value: 85000000, currency: TransactionCurrency.NGN}),

//   home_type: HomeType.DUPLEX,
//   price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
//   rating: 4.8,
//   reviews_count: 34,
//   bedrooms: 3,
//   bathrooms: 2,
//   plot_size: {value: 250, unit: MeasurementUnit.SQM},
//   kitchens: 1,
//   living_areas: 1,
//   dining_areas: 1,
//   other_rooms: 1,
//   year_built: 1987,
//   year_last_renovated: 2000,
//   days_on_veriprops: "12 days",
//   interior_description: {
//     bedrooms: "3 bedrooms with built-in wardrobes",
//     bathrooms: "2 full bathrooms with modern fixtures",
//     flooring: "Marble tiles throughout",
//     kitchens: "Modern kitchen with granite countertops and island",
//     living_areas: "Open-plan living",
//     dining_areas: "A spacious dining area",
//     other_rooms: "2 BQ rooms and a store"
//   },
//   parking: {
//     spaces: 2,
//     visitor_parking: true,
//     garage_type: "Covered carport",
//     covered: true,
//     street: false
//   },
//   exterior_description: {
//     lot_size: {value: 200, unit: MeasurementUnit.SQM},
//     garden: true,
//     fence: "Perimeter wall with gate",
//     balcony: true
//   },

//   location: {
//     address: "12 Admiralty Way, Lekki Phase 1, Lagos",
//     country: "Nigeria",
//     state: "Lagos",
//     city: "Lagos",
//     area: "Lekki Phase 1",
//     coordinates: { lat: 6.4318, lng: 3.4214 }
//   },
//   utilities: {
//     electricity: true,
//     water: true,
//     road: RoadState.PAVED,
//     drainage: true,
//     internet: true,
//     waste_disposal: true
//   },
//   verification: {
//     verified: true,
//     title_docs: [LandTitle.C_OF_O, LandTitle.GAZETTE],
//     zoning: PropertyZoning.RESIDENTIAL,
//     development_stage: PropertyStage.COMPLETED
//   },
//   highlights: [
//     "Prime Lekki Phase 1 location",
//     "Gated community with 24/7 security",
//     "Modern kitchen with granite countertops",
//     "Master suite with walk-in closet",
//     "Covered parking for 2 cars",
//     "Generator backup power"
//   ],
//   nearby_places: nearbyPlacesMock,
//   owner: { email: "kemi.adeoye@gmail.com", id: "user_10", name: "Aisha Adebayo", avatar: "https://images.unsplash.com/photo-1494790108755-2616b112b4e1?w=150&h=150&fit=crop&crop=face" },
//   created_at: "2025-01-15T10:00:00.000Z"
// },{
//   id: "prop-456",
//   slug: "prop_002",
//   type: PropertyType.LAND,
//   title: "Prime 600sqm Residential Plot in Ibeju-Lekki",
//   short_description: "Well-positioned 600sqm plot in a fast-developing residential estate, Ibeju-Lekki.",
//   description: "Secure this prime 600sqm plot of land in Ibeju-Lekki, one of Lagos' fastest-growing investment corridors. The land is dry, fenced, and located within a gated residential estate with good infrastructure. Perfect for building your dream home or as a long-term investment opportunity. Comes with verified title documents and accessible road network.",
//   images: [
//     {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Amenities},
//     {url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Amenities},
//     {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Amenities},
//     {url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Exterior},
//     {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Exterior},
//     {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Exterior},
//     {url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Exterior},
//   ],
//   price: Money.from({ value: 35_000_000, currency: TransactionCurrency.NGN }),

//   land_type: LandType.RESIDENTIAL,
//   price_per_sqm: Money.from({ value: 58_300, currency: TransactionCurrency.NGN }),
//   rating: 4.5,
//   reviews_count: 12,
//   plot_size: { value: 600, unit: MeasurementUnit.SQM },
//   days_on_veriprops: "8 days",

//   location: {
//     address: "Harmony Estate, Ibeju-Lekki, Lagos",
//     country: "Nigeria",
//     state: "Lagos",
//     city: "Lagos",
//     area: "Ibeju-Lekki",
//     coordinates: { lat: 6.4512, lng: 3.6021 }
//   },
//   utilities: {
//     electricity: true,
//     water: true,
//     road: RoadState.PAVED,
//     drainage: true,
//     internet: false,
//     waste_disposal: true
//   },
//   verification: {
//     verified: true,
//     title_docs: [LandTitle.EXCISION, LandTitle.SURVEY_PLAN],
//     zoning: PropertyZoning.RESIDENTIAL,
//     development_stage: PropertyStage.BARE_LAND
//   },
//   highlights: [
//     "Strategically located near the Lekki Free Trade Zone",
//     "600sqm fenced dry land",
//     "Located within a secure gated estate",
//     "Proximity to Dangote Refinery and Lekki Deep Sea Port",
//     "Verified title documents"
//   ],
//   nearby_places: nearbyPlacesMock,
//   owner: {
//     email: "chinedu.okafor@gmail.com",
//     id: "user_15",
//     name: "Chinedu Okafor",
//     avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face"
//   },
//   created_at: "2025-02-01T09:30:00.000Z"
// }
// ];

// export const properties: Property[] = [
//   // HOUSES (35 properties - 7 per city)
  
//   // LAGOS HOUSES (7)
//   {
//     id: "prop_001",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Cozy 3BR in Lekki with Garden",
//     short_description: "Spacious 3-bedroom house, verified title, gated community.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom},
//     ],
//     price: Money.from({value: 35000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
//     rating: 4.8,
//     reviews_count: 34,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Lekki", coordinates: {lat: 6.45, lng: 3.58} },
    
//     bedrooms: 3,
//     bathrooms: 2,
//     plot_size: {value: 250, unit: MeasurementUnit.SQM},
//     home_type: HomeType.TERRACE,
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_10", name: "Aisha Adebayo", avatar: "https://images.unsplash.com/photo-1494790108755-2616b112b4e1?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-15T10:00:00.000Z"
//   },
//   {
//     id: "prop_002",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Stylish 2BR Apartment Ikeja GRA",
//     short_description: "Modern finishes, 24/7 security, swimming pool, gym facility.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 28000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
//     rating: 4.5,
//     reviews_count: 52,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Ikeja GRA", coordinates: {lat: 6.60, lng: 3.35} },
    
//     bedrooms: 2,
//     bathrooms: 2,
//     plot_size: {value: 150, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_16", name: "Kemi Adeoye", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-18T08:30:00.000Z"
//   },
//   {
//     id: "prop_003",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Executive 6BR Mansion Banana Island",
//     short_description: "Ultra-luxury waterfront mansion, private beach, helipad.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom},
//     ],
//     price: Money.from({value: 500000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
//     rating: 5.0,
//     reviews_count: 18,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Banana Island", coordinates: {lat: 6.41, lng: 3.44} },
    
//     bedrooms: 6,
//     bathrooms: 4,
//     plot_size: {value: 1200, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_18", name: "Chief Adebayo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-03T12:00:00.000Z"
//   },
//   {
//     id: "prop_004",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Contemporary 3BR Townhouse VI",
//     short_description: "Modern townhouse in Victoria Island, rooftop garden, generator backup.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 78000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
//     rating: 4.6,
//     reviews_count: 29,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Victoria Island", coordinates: {lat: 6.43, lng: 3.42} },
    
//     bedrooms: 3,
//     bathrooms: 1,
//     plot_size: {value: 200, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_10", name: "Aisha Adebayo", avatar: "https://images.unsplash.com/photo-1494790108755-2616b112b4e1?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-19T11:15:00.000Z"
//   },
//   {
//     id: "prop_005",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Family 4BR Home Magodo",
//     short_description: "Spacious family home, children playground, secure neighborhood.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 55000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
//     rating: 4.4,
//     reviews_count: 42,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Magodo", coordinates: {lat: 6.58, lng: 3.38} },
    
//     bedrooms: 4,
//     bathrooms: 2,
//     plot_size: {value: 350, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_12", name: "Fatima Hassan", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-17T09:30:00.000Z"
//   },
//   {
//     id: "prop_006",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Minimalist 2BR Apartment Yaba",
//     short_description: "Modern minimalist design, co-working space nearby, tech hub location.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 32000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.3,
//     reviews_count: 25,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Yaba", coordinates: {lat: 6.52, lng: 3.37} },
    
//     bedrooms: 2,
//     bathrooms: 1,
//     plot_size: {value: 120, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_16", name: "Kemi Adeoye", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-21T14:45:00.000Z"
//   },
//   {
//     id: "prop_007",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Modern 3BR Penthouse Ikoyi",
//     short_description: "Top floor penthouse, panoramic city views, private elevator access.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 150000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.9,
//     reviews_count: 35,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Ikoyi", coordinates: {lat: 6.46, lng: 3.43} },
    
//     bedrooms: 3,
//     bathrooms: 2,
//     plot_size: {value: 180, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_18", name: "Chief Adebayo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-04T13:30:00.000Z"
//   },

//   // ABUJA HOUSES (7)
//   {
//     id: "prop_008",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Modern 4BR Duplex Wuse 2",
//     short_description: "Contemporary design, solar-powered, secure estate in Wuse 2.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 85000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.7,
//     reviews_count: 28,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Wuse 2", coordinates: {lat: 9.06, lng: 7.49} },
    
//     bedrooms: 4,
//     bathrooms: 3,
//     plot_size: {value: 400, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_12", name: "Fatima Hassan", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-08T09:15:00.000Z"
//   },
//   {
//     id: "prop_009",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Smart Home 4BR Guzape District",
//     short_description: "IoT-enabled home, smart security, energy efficient, Abuja prime area.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 125000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.7,
//     reviews_count: 31,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Guzape District", coordinates: {lat: 9.08, lng: 7.53} },
    
//     bedrooms: 4,
//     bathrooms: 2,
//     plot_size: {value: 600, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_20", name: "David Okonkwo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-16T14:20:00.000Z"
//   },
//   {
//     id: "prop_010",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Eco-Friendly 3BR House Maitama",
//     short_description: "Solar panels, rainwater harvesting, eco-friendly materials throughout.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 72000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.8,
//     reviews_count: 19,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Maitama", coordinates: {lat: 9.08, lng: 7.49} },
    
//     bedrooms: 3,
//     bathrooms: 2,
//     plot_size: {value: 300, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_20", name: "David Okonkwo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-13T16:00:00.000Z"
//   },
//   {
//     id: "prop_011",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Modern 4BR Detached House Kuje",
//     short_description: "Newly built, satellite town convenience, affordable luxury.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 42000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.4,
//     reviews_count: 16,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Kuje", coordinates: {lat: 8.88, lng: 7.23} },
    
//     bedrooms: 4,
//     bathrooms: 1,
//     plot_size: {value: 400, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_13", name: "Chinedu Okorie", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-25T11:00:00.000Z"
//   },
//   {
//     id: "prop_012",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Executive 5BR Villa Asokoro",
//     short_description: "Diplomatic zone, high security, premium finishes, garden view.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 185000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.9,
//     reviews_count: 22,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Asokoro", coordinates: {lat: 9.05, lng: 7.53} },
    
//     bedrooms: 5,
//     bathrooms: 2,
//     plot_size: {value: 800, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_15", name: "Ibrahim Musa", avatar: "https://images.usr/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-02T14:00:00.000Z"
//   },
//   {
//     id: "prop_013",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Contemporary 3BR Apartment Garki",
//     short_description: "Modern apartment, central location, shopping centers nearby.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 58000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.5,
//     reviews_count: 33,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Garki", coordinates: {lat: 9.04, lng: 7.49} },
    
//     bedrooms: 3,
//     bathrooms: 2,
//     plot_size: {value: 250, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_12", name: "Fatima Hassan", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-17T09:30:00.000Z"
//   },
//   {
//     id: "prop_014",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Luxury 4BR Mansion Jabi",
//     short_description: "Lake view, golf course nearby_places, premium neighborhood.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 220000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.8,
//     reviews_count: 15,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Jabi", coordinates: {lat: 9.07, lng: 7.49} },
    
//     bedrooms: 4,
//     bathrooms: 3,
//     plot_size: {value: 600, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_18", name: "Chief Adebayo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-08T12:15:00.000Z"
//   },

//   // ENUGU HOUSES (7)
//   {
//     id: "prop_015",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Charming 2BR Bungalow Independence Layout",
//     short_description: "Single-story home, large garden, quiet residential area.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 38000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.2,
//     reviews_count: 21,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "Independence Layout", coordinates: {lat: 6.44, lng: 7.50} },
    
//     bedrooms: 2,
//     bathrooms: 1,
//     plot_size: {value: 300, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_21", name: "Ngozi Obi", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-22T08:15:00.000Z"
//   },
//   {
//     id: "prop_016",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Modern 4BR Duplex GRA Enugu",
//     short_description: "Government residential area, excellent infrastructure, secure.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 65000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.6,
//     reviews_count: 18,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "GRA", coordinates: {lat: 6.46, lng: 7.51} },
    
//     bedrooms: 4,
//     bathrooms: 2,
//     plot_size: {value: 400, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_14", name: "Grace Udoma", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-06T10:20:00.000Z"
//   },
//   {
//     id: "prop_017",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Executive 3BR House New Haven",
//     short_description: "Prime location, modern amenities, family neighborhood.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 52000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.4,
//     reviews_count: 26,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "New Haven", coordinates: {lat: 6.45, lng: 7.52} },
    
//     bedrooms: 3,
//     bathrooms: 2,
//     plot_size: {value: 320, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_11", name: "Emeka Okafor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-24T09:45:00.000Z"
//   },
//   {
//     id: "prop_018",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Cozy 2BR Apartment Trans Ekulu",
//     short_description: "Affordable housing, good road network, peaceful environment.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 28000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.1,
//     reviews_count: 19,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "Trans Ekulu", coordinates: {lat: 6.43, lng: 7.49} },
    
//     bedrooms: 2,
//     bathrooms: 1,
//     plot_size: {value: 200, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_17", name: "Maryam Aliyu", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-23T12:30:00.000Z"
//   },
//   {
//     id: "prop_019",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Spacious 5BR Family Home Uwani",
//     short_description: "Large compound, children playground, traditional design.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 75000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.5,
//     reviews_count: 14,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "Uwani", coordinates: {lat: 6.44, lng: 7.48} },
    
//     bedrooms: 5,
//     bathrooms: 3,
//     plot_size: {value: 600, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_13", name: "Chinedu Okorie", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-25T11:00:00.000Z"
//   },
//   {
//     id: "prop_020",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Modern 3BR Townhouse Achara Layout",
//     short_description: "Contemporary design, gated estate, 24/7 security.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 45000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.3,
//     reviews_count: 23,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "Achara Layout", coordinates: {lat: 6.46, lng: 7.50} },
    
//     bedrooms: 3,
//     bathrooms: 2,
//     plot_size: {value: 280, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_16", name: "Kemi Adeoye", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-26T16:30:00.000Z"
//   },
//   {
//     id: "prop_021",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Luxury 4BR Villa Coal City Layout",
//     short_description: "Premium finishing, swimming pool, generator backup.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 95000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.7,
//     reviews_count: 12,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "Coal City Layout", coordinates: {lat: 6.47, lng: 7.53} },
    
//     bedrooms: 4,
//     bathrooms: 3,
//     plot_size: {value: 500, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_10", name: "Aisha Adebayo", avatar: "https://images.unsplash.com/photo-1494790108755-2616b112b4e1?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-27T10:15:00.000Z"
//   },

//   // PORT HARCOURT HOUSES (7)
//   {
//     id: "prop_022",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Luxury 5BR Villa Old GRA",
//     short_description: "Waterfront villa with private dock, fully furnished, generator.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 95000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.9,
//     reviews_count: 45,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "Old GRA", coordinates: {lat: 4.82, lng: 7.03} },
    
//     bedrooms: 5,
//     bathrooms: 4,
//     plot_size: {value: 800, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_14", name: "Grace Udoma", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-05T11:20:00.000Z"
//   },
//   {
//     id: "prop_023",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Executive 4BR Duplex New GRA",
//     short_description: "Oil industry executives area, high security, modern amenities.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 78000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.6,
//     reviews_count: 32,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "New GRA", coordinates: {lat: 4.81, lng: 7.02} },
    
//     bedrooms: 4,
//     bathrooms: 2,
//     plot_size: {value: 450, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_19", name: "Etim Bassey", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-09T15:45:00.000Z"
//   },
//   {
//     id: "prop_024",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Modern 3BR Apartment D/Line",
//     short_description: "Central location, commercial area nearby_places, good transport links.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 42000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.3,
//     reviews_count: 28,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "D/Line", coordinates: {lat: 4.80, lng: 7.01} },
    
//     bedrooms: 3,
//     bathrooms: 1,
//     plot_size: {value: 200, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_11", name: "Emeka Okafor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-24T09:45:00.000Z"
//   },
//   {
//     id: "prop_025",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Waterfront 4BR House Rumuolumeni",
//     short_description: "River view, private jetty, serene environment, luxury finishes.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 110000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.8,
//     reviews_count: 26,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "Rumuolumeni", coordinates: {lat: 4.83, lng: 7.05} },
    
//     bedrooms: 4,
//     bathrooms: 2,
//     plot_size: {value: 600, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_19", name: "Etim Bassey", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-09T15:45:00.000Z"
//   },
//   {
//     id: "prop_026",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Cozy 2BR Bungalow Elekahia",
//     short_description: "Affordable housing, peaceful neighborhood, good road access.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 35000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.2,
//     reviews_count: 19,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "Elekahia", coordinates: {lat: 4.79, lng: 7.00} },
    
//     bedrooms: 2,
//     bathrooms: 1,
//     plot_size: {value: 300, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_17", name: "Maryam Aliyu", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-23T12:30:00.000Z"
//   },
//   {
//     id: "prop_027",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Contemporary 3BR House Woji",
//     short_description: "New development area, modern infrastructure, family friendly.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 58000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.4,
//     reviews_count: 16,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "Woji", coordinates: {lat: 4.84, lng: 7.04} },
    
//     bedrooms: 3,
//     bathrooms: 2,
//     plot_size: {value: 350, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_15", name: "Ibrahim Musa", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-02T14:00:00.000Z"
//   },
//   {
//     id: "prop_028",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Luxury 5BR Mansion Trans Amadi",
//     short_description: "Industrial area nearby_places, executive housing, large compound.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 135000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.7,
//     reviews_count: 17,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "Trans Amadi", coordinates: {lat: 4.80, lng: 7.01} },
    
//     bedrooms: 5,
//     bathrooms: 3,
//     plot_size: {value: 900, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_18", name: "Chief Adebayo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-02T11:45:00.000Z"
//   },

//   // ASABA HOUSES (7)
//   {
//     id: "prop_029",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Executive 4BR Duplex GRA Asaba",
//     short_description: "Government residential area, excellent infrastructure, secure.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 55000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.4,
//     reviews_count: 24,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "GRA", coordinates: {lat: 6.20, lng: 6.73} },
    
//     bedrooms: 4,
//     bathrooms: 2,
//     plot_size: {value: 400, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_21", name: "Ngozi Obi", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-11T10:30:00.000Z"
//   },
//   {
//     id: "prop_030",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Modern 3BR Apartment Cable Point",
//     short_description: "Riverfront location, bridge views, luxury amenities.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 48000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.5,
//     reviews_count: 18,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Cable Point", coordinates: {lat: 6.19, lng: 6.72} },
    
//     bedrooms: 3,
//     bathrooms: 2,
//     plot_size: {value: 250, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_10", name: "Aisha Adebayo", avatar: "https://images.unsplash.com/photo-1494790108755-2616b112b4e1?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-27T10:15:00.000Z"
//   },
//   {
//     id: "prop_031",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Cozy 2BR House Bonsaac Layout",
//     short_description: "Peaceful residential area, affordable housing, good access roads.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 32000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.1,
//     reviews_count: 15,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Bonsaac Layout", coordinates: {lat: 6.21, lng: 6.74} },
    
//     bedrooms: 2,
//     bathrooms: 1,
//     plot_size: {value: 200, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_16", name: "Kemi Adeoye", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-01T15:15:00.000Z"
//   },
//   {
//     id: "prop_032",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Spacious 5BR Family Home Okpanam",
//     short_description: "Large compound, traditional architecture, extended family suitable.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 68000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.3,
//     reviews_count: 20,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Okpanam", coordinates: {lat: 6.22, lng: 6.75} },
    
//     bedrooms: 5,
//     bathrooms: 3,
//     plot_size: {value: 600, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_13", name: "Chinedu Okorie", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-03T13:20:00.000Z"
//   },
//   {
//     id: "prop_033",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Contemporary 3BR Duplex Summit Road",
//     short_description: "Hilltop location, panoramic views, modern design.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 62000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.6,
//     reviews_count: 22,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Summit Road", coordinates: {lat: 6.18, lng: 6.71} },
    
//     bedrooms: 3,
//     bathrooms: 2,
//     plot_size: {value: 350, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_12", name: "Fatima Hassan", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-28T14:20:00.000Z"
//   },
//   {
//     id: "prop_034",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Luxury 4BR Villa Ezenei Layout",
//     short_description: "Premium finishing, swimming pool, generator backup, security.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 85000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.7,
//     reviews_count: 13,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Ezenei Layout", coordinates: {lat: 6.23, lng: 6.76} },
    
//     bedrooms: 4,
//     bathrooms: 2,
//     plot_size: {value: 500, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_20", name: "David Okonkwo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-04T16:00:00.000Z"
//   },
//   {
//     id: "prop_035",
//     slug: "prop_001",
//     type: PropertyType.HOUSE,
//     title: "Affordable 2BR Apartment Infant Jesus",
//     short_description: "Budget-friendly, good transport links, local amenities nearby.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 25000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.0,
//     reviews_count: 17,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Infant Jesus", coordinates: {lat: 6.20, lng: 6.73} },
    
//     bedrooms: 2,
//     bathrooms: 2,
//     plot_size: {value: 150, unit: MeasurementUnit.SQM},
    
//     home_type: HomeType.TERRACE,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_17", name: "Maryam Aliyu", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-05T10:30:00.000Z"
//   },

//   // LANDS (35 properties - 7 per city)
  
//   // LAGOS LANDS (7)
//   {
//     id: "prop_036",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Prime 1000sqm Plot Ikoyi",
//     short_description: "Waterfront land with C of O, perfect for luxury development.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 120000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.9,
//     reviews_count: 12,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Ikoyi", coordinates: {lat: 6.46, lng: 3.43} },
    
//     plot_size: {value: 1000, unit: MeasurementUnit.SQM},
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_11", name: "Emeka Okafor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-10T14:30:00.000Z"
//   },
//   {
//     id: "prop_037",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "500sqm Residential Plot Victoria Island",
//     short_description: "Premium location, close to financial district, clean title.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 200000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.6,
//     reviews_count: 8,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Victoria Island", coordinates: {lat: 6.43, lng: 3.42} },
    
//     plot_size: {value: 500, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_13", name: "Chinedu Okorie", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-12T16:45:00.000Z"
//   },
//   {
//     id: "prop_038",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Residential Estate Plot Lekki Phase 2",
//     short_description: "Gated estate development, infrastructure ready, family neighborhood.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 85000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.5,
//     reviews_count: 18,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Lekki Phase 2", coordinates: {lat: 6.45, lng: 3.60} },
    
//     plot_size: {value: 600, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_10", name: "Aisha Adebayo", avatar: "https://images.unsplash.com/photo-1494790108755-2616b112b4e1?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-27T10:15:00.000Z"
//   },
//   {
//     id: "prop_039",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Tech Hub Plot Yaba Lagos",
//     short_description: "Innovation district, startup ecosystem, co-working spaces nearby.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 95000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.6,
//     reviews_count: 13,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Yaba", coordinates: {lat: 6.52, lng: 3.37} },
    
//     plot_size: {value: 300, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_20", name: "David Okonkwo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-01T15:15:00.000Z"
//   },
//   {
//     id: "prop_040",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Airport Road Commercial Plot Ikeja",
//     short_description: "High traffic location, billboard potential, great visibility.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 110000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.3,
//     reviews_count: 16,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Ikeja", coordinates: {lat: 6.58, lng: 3.33} },
    
//     plot_size: {value: 800, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_11", name: "Emeka Okafor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-02T11:45:00.000Z"
//   },
//   {
//     id: "prop_041",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Waterfront Plot Ajah Lagos",
//     short_description: "Beach access, tourism potential, luxury development opportunity.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 75000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.4,
//     reviews_count: 21,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Ajah", coordinates: {lat: 6.47, lng: 3.58} },
    
//     plot_size: {value: 900, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_16", name: "Kemi Adeoye", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-30T12:00:00.000Z"
//   },
//   {
//     id: "prop_042",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Mixed Development Plot Surulere",
//     short_description: "Commercial/residential zoning, central Lagos location, high ROI potential.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 65000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.2,
//     reviews_count: 14,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Lagos", city: "Lagos", area: "Surulere", coordinates: {lat: 6.50, lng: 3.36} },
    
//     plot_size: {value: 700, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_12", name: "Fatima Hassan", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-11T10:30:00.000Z"
//   },

//   // ABUJA LANDS (7)
//   {
//     id: "prop_043",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Commercial Plot Wuse 2 Abuja",
//     short_description: "Business district location, high foot traffic, great for retail/office.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 250000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.7,
//     reviews_count: 9,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Wuse 2", coordinates: {lat: 9.06, lng: 7.49} },
    
//     plot_size: {value: 400, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_12", name: "Fatima Hassan", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-28T14:20:00.000Z"
//   },
//   {
//     id: "prop_044",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Golf Course Adjacent Plot Jabi",
//     short_description: "Premium location, golf course views, luxury development potential.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 300000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.8,
//     reviews_count: 15,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Jabi", coordinates: {lat: 9.07, lng: 7.49} },
    
//     plot_size: {value: 1500, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_12", name: "Fatima Hassan", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-08T12:15:00.000Z"
//   },
//   {
//     id: "prop_045",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Residential Plot Guzape District",
//     short_description: "Prime residential area, modern infrastructure, diplomatic zone nearby_places.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 180000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.6,
//     reviews_count: 11,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Guzape District", coordinates: {lat: 9.08, lng: 7.53} },
    
//     plot_size: {value: 800, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_20", name: "David Okonkwo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-16T14:20:00.000Z"
//   },
//   {
//     id: "prop_046",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Investment Plot Maitama Extension",
//     short_description: "Upcoming development area, government backing, future appreciation.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 220000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.5,
//     reviews_count: 7,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Maitama Extension", coordinates: {lat: 9.09, lng: 7.50} },
    
//     plot_size: {value: 1000, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_15", name: "Ibrahim Musa", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-13T16:00:00.000Z"
//   },
//   {
//     id: "prop_047",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Commercial Hub Plot Garki",
//     short_description: "Central business district, mixed-use development, high demand area.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 160000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.4,
//     reviews_count: 13,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Garki", coordinates: {lat: 9.04, lng: 7.49} },
    
//     plot_size: {value: 600, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_13", name: "Chinedu Okorie", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-17T09:30:00.000Z"
//   },
//   {
//     id: "prop_048",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Affordable Plot Kubwa Satellite Town",
//     short_description: "Budget-friendly land, growing community, good transport links to city center.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 45000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.1,
//     reviews_count: 19,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Kubwa", coordinates: {lat: 9.15, lng: 7.35} },
    
//     plot_size: {value: 500, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_17", name: "Maryam Aliyu", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-25T11:00:00.000Z"
//   },
//   {
//     id: "prop_049",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Industrial Zone Plot Kuje",
//     short_description: "Industrial development area, factory suitable, good road access.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 65000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.2,
//     reviews_count: 8,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "FCT", city: "Abuja", area: "Kuje", coordinates: {lat: 8.88, lng: 7.23} },
    
//     plot_size: {value: 2000, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_18", name: "Chief Adebayo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-06T14:45:00.000Z"
//   },

//   // ENUGU LANDS (7)
//   {
//     id: "prop_050",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Commercial Plot Independence Layout",
//     short_description: "Business development area, market nearby_places, high commercial potential.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 55000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.3,
//     reviews_count: 16,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "Independence Layout", coordinates: {lat: 6.44, lng: 7.50} },
    
//     plot_size: {value: 700, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_21", name: "Ngozi Obi", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-22T08:15:00.000Z"
//   },
//   {
//     id: "prop_051",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Residential Plot GRA Enugu",
//     short_description: "Government residential area, prestigious location, clean title.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 75000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.5,
//     reviews_count: 12,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "GRA", coordinates: {lat: 6.46, lng: 7.51} },
    
//     plot_size: {value: 600, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_14", name: "Grace Udoma", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-06T10:20:00.000Z"
//   },
//   {
//     id: "prop_052",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Development Plot New Haven",
//     short_description: "Mixed-use zoning, urban development area, infrastructure ready.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 48000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.2,
//     reviews_count: 18,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "New Haven", coordinates: {lat: 6.45, lng: 7.52} },
    
//     plot_size: {value: 500, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_11", name: "Emeka Okafor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-24T09:45:00.000Z"
//   },
//   {
//     id: "prop_053",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Affordable Plot Trans Ekulu",
//     short_description: "Budget housing area, family development, good road network.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 32000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.0,
//     reviews_count: 23,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "Trans Ekulu", coordinates: {lat: 6.43, lng: 7.49} },
    
//     plot_size: {value: 400, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_17", name: "Maryam Aliyu", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-23T12:30:00.000Z"
//   },
//   {
//     id: "prop_054",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Investment Plot Uwani Extension",
//     short_description: "Expanding residential area, future appreciation potential.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 42000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.1,
//     reviews_count: 14,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "Uwani", coordinates: {lat: 6.44, lng: 7.48} },
    
//     plot_size: {value: 450, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_13", name: "Chinedu Okorie", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-25T11:00:00.000Z"
//   },
//   {
//     id: "prop_055",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Estate Development Plot Achara",
//     short_description: "Gated community development, security features, modern planning.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 58000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.4,
//     reviews_count: 11,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "Achara Layout", coordinates: {lat: 6.46, lng: 7.50} },
    
//     plot_size: {value: 550, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_16", name: "Kemi Adeoye", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-26T16:30:00.000Z"
//   },
//   {
//     id: "prop_056",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Premium Plot Coal City Layout",
//     short_description: "High-end residential area, luxury development potential, city views.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 85000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.6,
//     reviews_count: 9,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Enugu", city: "Enugu", area: "Coal City Layout", coordinates: {lat: 6.47, lng: 7.53} },
    
//     plot_size: {value: 800, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_10", name: "Aisha Adebayo", avatar: "https://images.unsplash.com/photo-1494790108755-2616b112b4e1?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-27T10:15:00.000Z"
//   },

//   // PORT HARCOURT LANDS (7)
//   {
//     id: "prop_057",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Waterfront Plot Old GRA",
//     short_description: "River access, luxury development potential, premium location.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 150000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.8,
//     reviews_count: 15,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "Old GRA", coordinates: {lat: 4.82, lng: 7.03} },
    
//     plot_size: {value: 1200, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_14", name: "Grace Udoma", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-05T11:20:00.000Z"
//   },
//   {
//     id: "prop_058",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Executive Plot New GRA",
//     short_description: "Oil industry executives area, high security, modern infrastructure.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 95000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.6,
//     reviews_count: 12,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "New GRA", coordinates: {lat: 4.81, lng: 7.02} },
    
//     plot_size: {value: 800, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_19", name: "Etim Bassey", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-09T15:45:00.000Z"
//   },
//   {
//     id: "prop_059",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Commercial Plot D/Line",
//     short_description: "Central business district, high foot traffic, retail/office development.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 65000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.3,
//     reviews_count: 18,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "D/Line", coordinates: {lat: 4.80, lng: 7.01} },
    
//     plot_size: {value: 600, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_11", name: "Emeka Okafor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-24T09:45:00.000Z"
//   },
//   {
//     id: "prop_060",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Riverside Plot Rumuolumeni",
//     short_description: "Waterfront development, serene environment, luxury potential.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 120000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.7,
//     reviews_count: 10,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "Rumuolumeni", coordinates: {lat: 4.83, lng: 7.05} },
    
//     plot_size: {value: 1000, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_19", name: "Etim Bassey", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-09T15:45:00.000Z"
//   },
//   {
//     id: "prop_061",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Affordable Plot Elekahia",
//     short_description: "Budget-friendly development area, growing neighborhood, good access.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 38000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.1,
//     reviews_count: 22,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "Elekahia", coordinates: {lat: 4.79, lng: 7.00} },
    
//     plot_size: {value: 500, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_17", name: "Maryam Aliyu", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-23T12:30:00.000Z"
//   },
//   {
//     id: "prop_062",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Development Plot Woji New Layout",
//     short_description: "Modern planning, infrastructure development, family neighborhood.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 55000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.4,
//     reviews_count: 14,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "Woji", coordinates: {lat: 4.84, lng: 7.04} },
    
//     plot_size: {value: 650, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_15", name: "Ibrahim Musa", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-02T14:00:00.000Z"
//   },
//   {
//     id: "prop_063",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Industrial Zone Plot Trans Amadi",
//     short_description: "Industrial development, heavy machinery access, oil servicing area.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 90000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.2,
//     reviews_count: 8,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Rivers", city: "Port Harcourt", area: "Trans Amadi", coordinates: {lat: 4.80, lng: 7.01} },
    
//     plot_size: {value: 2000, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_18", name: "Chief Adebayo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-02T11:45:00.000Z"
//   },

//   // ASABA LANDS (7)
//   {
//     id: "prop_064",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Prime Plot GRA Asaba",
//     short_description: "Government residential area, excellent infrastructure, secure location.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 60000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.2,
//     reviews_count: 14,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "GRA", coordinates: {lat: 6.20, lng: 6.73} },
    
//     plot_size: {value: 800, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_21", name: "Ngozi Obi", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-11T10:30:00.000Z"
//   },
//   {
//     id: "prop_065",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Waterfront Plot Cable Point",
//     short_description: "Bridge views, riverfront development, tourism potential.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 75000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.5,
//     reviews_count: 11,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Cable Point", coordinates: {lat: 6.19, lng: 6.72} },
    
//     plot_size: {value: 900, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_10", name: "Aisha Adebayo", avatar: "https://images.unsplash.com/photo-1494790108755-2616b112b4e1?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-27T10:15:00.000Z"
//   },
//   {
//     id: "prop_066",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Residential Plot Bonsaac Layout",
//     short_description: "Family development area, peaceful environment, affordable pricing.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 35000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.0,
//     reviews_count: 18,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Bonsaac Layout", coordinates: {lat: 6.21, lng: 6.74} },
    
//     plot_size: {value: 500, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_16", name: "Kemi Adeoye", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-01T15:15:00.000Z"
//   },
//   {
//     id: "prop_067",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Development Plot Okpanam Road",
//     short_description: "Major road frontage, commercial potential, high visibility.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 52000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.3,
//     reviews_count: 15,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Okpanam", coordinates: {lat: 6.22, lng: 6.75} },
    
//     plot_size: {value: 700, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_13", name: "Chinedu Okorie", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-03T13:20:00.000Z"
//   },
//   {
//     id: "prop_068",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Hilltop Plot Summit Road",
//     short_description: "Elevated location, panoramic views, luxury development opportunity.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 68000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.4,
//     reviews_count: 12,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Summit Road", coordinates: {lat: 6.18, lng: 6.71} },
    
//     plot_size: {value: 800, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_12", name: "Fatima Hassan", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-01-28T14:20:00.000Z"
//   },
//   {
//     id: "prop_069",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Estate Plot Ezenei Layout",
//     short_description: "Gated community development, modern infrastructure, security features.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 58000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 4.5,
//     reviews_count: 9,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Ezenei Layout", coordinates: {lat: 6.23, lng: 6.76} },
    
//     plot_size: {value: 650, unit: MeasurementUnit.SQM},
    
//     land_type: LandType.RESIDENTIAL,
    
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_20", name: "David Okonkwo", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-04T16:00:00.000Z"
//   },
//   {
//     id: "prop_070",
//     slug: "prop_002",
//     type: PropertyType.LAND,
//     title: "Investment Plot Infant Jesus Area",
//     short_description: "Growing neighborhood, future appreciation potential, good access roads.",
//     images: [
//       {url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop", category: PropertyAssetPhotoCategory.Bathroom}
//     ],
//     price: Money.from({value: 28000000, currency: TransactionCurrency.NGN}),
//     price_per_sqm: Money.from({value: 350_000, currency: TransactionCurrency.NGN}),
    
//     rating: 3.9,
//     reviews_count: 20,
//     location: { address: "Harmony Estate, Ibeju-Lekki, Lagos", country: "Nigeria", state: "Delta", city: "Asaba", area: "Infant Jesus", coordinates: {lat: 6.20, lng: 6.73} },
    
//     plot_size: {value: 400, unit: MeasurementUnit.METER},
    
//     land_type: LandType.RESIDENTIAL,
    
//     utilities: { electricity: true, water: true, road: RoadState.PAVED, drainage: true, internet: false, waste_disposal: true},
//     nearby_places: nearbyPlacesMock,
    
//     owner: { email: "kemi.adeoye@gmail.com", id: "user_17", name: "Maryam Aliyu", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
//     created_at: "2025-02-05T10:30:00.000Z"
//   }
// ];

// export const services: Service[] = [
//   {
//     id: "svc_001",
//     slug: "svc_001",
//     title: "Survey & Title Verification",
//     provider: "Verified Surveyors Co",
//     price: Money.from({value: 150000, currency: TransactionCurrency.NGN}),
//     duration: "per plot",
//     rating: 4.9,
//     images: ["https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop"],
//     short_description: "Complete title verification and boundary survey with certified report.",
//     created_at: "2025-01-15T10:00:00.000Z"
//   },
//   {
//     id: "svc_002",
//     slug: "svc_002",
//     title: "Property Valuation Service",
//     provider: "Lagos Property Valuers",
//     price: Money.from({value: 75000, currency: TransactionCurrency.NGN}),
//     duration: "2-3 days",
//     rating: 4.7,
//     images: ["https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop"],
//     short_description: "Professional property valuation for mortgage, insurance, or sale purposes.",
//     created_at: "2025-01-12T14:30:00.000Z"
//   },
//   {
//     id: "svc_003",
//     slug: "svc_003",
//     title: "Legal Documentation Support",
//     provider: "Property Law Associates",
//     price: Money.from({value: 200000, currency: TransactionCurrency.NGN}),
//     duration: "1-2 weeks",
//     rating: 4.8,
//     images: ["https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop"],
//     short_description: "Complete legal documentation for property purchase, sale and transfer.",
//     created_at: "2025-01-10T09:15:00.000Z"
//   },
//   {
//     id: "svc_004",
//     slug: "svc_004",
//     title: "Property Management Service", 
//     provider: "Elite Property Managers",
//     price: Money.from({value: 50000, currency: TransactionCurrency.NGN}),
//     duration: "per month",
//     rating: 4.6,
//     images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"],
//     short_description: "Full property management including tenant screening, rent collection, maintenance.",
//     created_at: "2025-01-08T16:45:00.000Z"
//   },
//   {
//     id: "svc_005",
//     slug: "svc_005",
//     title: "Building Inspection Service",
//     provider: "Structural Engineers Ltd",
//     price: Money.from({value: 100000, currency: TransactionCurrency.NGN}),
//     duration: "same day",
//     rating: 4.9,
//     images: ["https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"],
//     short_description: "Comprehensive building inspection with detailed structural and systems report.",
//     created_at: "2025-01-05T11:20:00.000Z"
//   },
//   {
//     id: "svc_006",
//     slug: "svc_006",
//     title: "Interior Design Consultation",
//     provider: "Modern Spaces Studio",
//     price: Money.from({value: 300000, currency: TransactionCurrency.NGN}),
//     duration: "project basis",
//     rating: 4.8, 
//     images: ["https://images.unsplash.com/photo-1586023492125-27b2c045eac7?w=800&h=600&fit=crop"],
//     short_description: "Complete interior design service from concept to implementation with 3D rendering.",
//     created_at: "2025-01-18T13:00:00.000Z"
//   },
//   {
//     id: "svc_007",
//     slug: "svc_007",
//     title: "Mortgage Advisory Service",
//     provider: "Finance Plus Consultants", 
//     price: Money.from({value: 25000, currency: TransactionCurrency.NGN}),
//     duration: "consultation",
//     rating: 4.5,
//     images: ["https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=600&fit=crop"],
//     short_description: "Expert mortgage advisory to help secure best rates and terms for property financing.",
//     created_at: "2025-01-07T08:30:00.000Z"
//   },
//   {
//     id: "svc_008",
//     slug: "svc_008",
//     title: "Property Photography & Marketing",
//     provider: "Visual Properties Media",
//     price: Money.from({value: 80000, currency: TransactionCurrency.NGN}),
//     duration: "2 days",
//     rating: 4.9,
//     images: ["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop"],
//     short_description: "Professional property photography, drone shots, virtual tours and marketing materials.",
//     created_at: "2025-01-14T15:45:00.000Z"
//   }
// ];

// export const users: User[] = [
//   { id: "user_10", name: "Aisha Adebayo", email: "aisha@veriprops.test", avatar: "https://images.unsplash.com/photo-1494790108755-2616b112b4e1?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_11", name: "Emeka Okafor", email: "emeka@veriprops.test", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_12", name: "Fatima Hassan", email: "fatima@veriprops.test", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_13", name: "Chinedu Okorie", email: "chinedu@veriprops.test", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_14", name: "Grace Udoma", email: "grace@veriprops.test", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_15", name: "Ibrahim Musa", email: "ibrahim@veriprops.test", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_16", name: "Kemi Adeoye", email: "kemi@veriprops.test", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_17", name: "Maryam Aliyu", email: "maryam@veriprops.test", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_18", name: "Chief Adebayo", email: "chief@veriprops.test", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_19", name: "Etim Bassey", email: "etim@veriprops.test", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_20", name: "David Okonkwo", email: "david@veriprops.test", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//   { id: "user_21", name: "Ngozi Obi", email: "ngozi@veriprops.test", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" }
// ];
  


// Mock API functions with simulated latency
// export const mockApi = {
//   async getProperties(filters?: { type?: string; location?: string; minPrice?: Money; maxPrice?: Money }): Promise<Property[]> {
//     // Simulate network latency
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 600 + 200));
    
//     let filteredProperties = [...properties];
    
//     if (filters) {
//       if (filters.type) {
//         filteredProperties = filteredProperties.filter(p => p.type === filters.type);
//       }
//       if (filters.location) {
//         filteredProperties = filteredProperties.filter(p => 
//           p.location.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
//           p.location.area.toLowerCase().includes(filters.location!.toLowerCase())
//         );
//       }
//       if (filters.minPrice) {
//         filteredProperties = filteredProperties.filter(p => p.price.isGreaterThan(filters.minPrice!));
//       }
//       if (filters.maxPrice) {
//         filteredProperties = filteredProperties.filter(p => p.price.isLessThan(filters.maxPrice!));
//       }
//     }
    
//     return filteredProperties;
//   },

//   async getRecommended(slug: string): Promise<Property[] | null> {
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
//     const property = properties.find(p => p.slug === slug) || null;

//     let filters: any = {};
//     filters.type = property?.type;
//     const filteredProperties = await mockApi.getProperties(filters);

//     return filteredProperties
//           .sort(() => Math.random() - 0.5)
//           .slice(0, 8);
//   },

//   async getRecommendedNewListing(slug: string): Promise<Property[] | null> {
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
//     const property = properties.find(p => p.slug === slug) || null;

//     let filters: any = {};
//     filters.type = property?.type;
//     const filteredProperties = await mockApi.getProperties(filters);

//     console.log("Seed filteredProperties: ", filteredProperties)

//     return filteredProperties
//           // sort by created_at descending
//           .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
//           // shuffle the sorted list
//           .sort(() => Math.random() - 0.5)
//           // take up to 8
//           .slice(0, 8);
//   },

//   async getServices(): Promise<Service[]> {
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 150));
//     return [...services];
//   },

//   async getPropertyById(id: string): Promise<Property | null> {
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
//     return properties.find(p => p.id === id) || null;
//   },

//   async getPropertyBySlug(slug: string): Promise<Property | null> {
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
//     return propertyDetails.find(p => p.slug === slug) || null;
//   },

//   async getServiceById(id: string): Promise<Service | null> {
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
//     return services.find(s => s.id === id) || null;
//   },
  
//   async getSearchResults(category: 'houses' | 'lands', filters: Partial<HouseFilters | LandFilters>): Promise<Property[]> {
//     const filteredProperties = await mockApi.getProperties({type: category === "houses" ? PropertyType.HOUSE : PropertyType.LAND});
//     let results = [...filteredProperties];

//     // console.log("Search results: ", results)
  
//     // Apply filters
//     if (filters.price_min) {
//       results = results.filter(item => item.price.getValue() >= filters.price_min!);
//     }
//     if (filters.price_max) {
//       results = results.filter(item => item.price.getValue() <= filters.price_max!);
//     }
  
//     // Category-specific filters
//     if (category === 'houses') {
//       const houseFilters = filters as Partial<HouseFilters>;
//       const houseResults = results as HouseProperty[];

//       if (houseFilters.bedrooms && houseFilters.bedrooms !== 'any') {
//         if (houseFilters.bedrooms === 'studio') {
//           results = houseResults.filter(house => house.bedrooms === 0);
//         } else if (typeof houseFilters.bedrooms === 'object') {
//           const { min, max } = houseFilters.bedrooms;
//           results = houseResults.filter(house => {
//             if (min && house.bedrooms < min) return false;
//             if (max && house.bedrooms > max) return false;
//             return true;
//           });
//         }
//       }
  
//       if (houseFilters.bathrooms && houseFilters.bathrooms > 0) {
//         results = houseResults.filter(house => house.bathrooms >= houseFilters.bathrooms!);
//       }
  
//       if (houseFilters.home_types && houseFilters.home_types.length > 0) {
//         results = houseResults.filter(house => houseFilters.home_types!.includes(house.home_type));
//       }
//     }
  
//     if (category === 'lands') {
//       const landFilters = filters as Partial<LandFilters>;
//       const landResults = results as LandProperty[];
  
//       if (landFilters.land_types && landFilters.land_types.length > 0) {
//         results = landResults.filter(land => landFilters.land_types!.includes(land.land_type));
//       }
//     }
  
//     // Apply sorting
//     switch (filters.sort) {
//       case 'newest':
//         results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
//         break;
//       case 'priceAsc':
//         results.sort((a, b) => a.price.getValue() - b.price.getValue());
//         break;
//       case 'priceDesc':
//         results.sort((a, b) => b.price.getValue() - a.price.getValue());
//         break;
//       case 'plotSize':
//         results.sort((a, b) => {
//           const aSize = a.plot_size.value;
//           const bSize = b.plot_size.value
//           return bSize - aSize;
//         });
//         break;
//       case 'lotSize':
//         if (category === 'houses'){
//         const houseResults = results as HouseProperty[];
//         houseResults.sort((a, b) => {
//           const aSize = a.exterior_description!.lot_size.value;
//           const bSize = b.exterior_description!.lot_size.value;
//           return bSize - aSize;
//         });
//         results = houseResults;
//       }
//         break;
//       case 'pricePerSqm':
//         results.sort((a, b) => b.price_per_sqm.getValue() - a.price_per_sqm.getValue());
//         break;
//       default: // recommended
//         break;
//     }
      
//       // console.log("Search results: ", results, ", category: ", category)
//       // console.log("filters: ", filters)
  
//     return results;
//   }
  
// };
