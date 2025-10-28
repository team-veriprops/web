import { getRandomImages } from "@app/api/unsplash/random/lib/unsplash-util";
import {
  HomeType,
  HouseProperty,
  LandProperty,
  LandTitle,
  LandType,
  MeasurementUnit,
  Money,
  Property,
  PropertyStage,
  PropertyType,
  PropertyZoning,
  QueryHousePropertyDto,
  QueryLandPropertyDto,
  QueryPropertyDto,
  RoadState,
  TransactionCurrency,
} from "@components/website/property/models";
import { PropertyAssetPhotoCategory } from "@components/website/property/PropertyDetails/models";
import { faker } from "@faker-js/faker";

export const stateCityMap: { state: string; grouping_city: string; cities: string[] }[] = [
  { state: "Lagos", grouping_city: "Lagos", cities: ["Ikeja", "Lekki", "Victoria Island", "Surulere", "Yaba"],},
  { state: "Abuja", grouping_city: "Abuja", cities: ["Garki", "Maitama", "Wuse", "Asokoro"] },
  { state: "Oyo", grouping_city: "Ibadan", cities: ["Ibadan", "Ogbomosho", "Oyo Town"] },
  { state: "Rivers", grouping_city: "Port Harcourt", cities: ["Port Harcourt", "Obio-Akpor"] },
  { state: "Enugu", grouping_city: "Enugu", cities: ["Enugu", "Nsukka"] },
  { state: "Delta", grouping_city: "Asaba", cities: ["Cable Point", "GRA", "Cable Point", "Bonsaac Layout", "Okpanam"] },
];

export function getRandomStateCity() {
  const stateEntry = faker.helpers.arrayElement(stateCityMap);
  const city = faker.helpers.arrayElement(stateEntry.cities);
  return { state: stateEntry.state, grouping_city:stateEntry.grouping_city, city };
}

function getHouseAssetCategory(index: number) {
  const categories = [
    PropertyAssetPhotoCategory.Amenities,
    PropertyAssetPhotoCategory.Bathroom,
    PropertyAssetPhotoCategory.Bedroom,
    PropertyAssetPhotoCategory.Dining,
    PropertyAssetPhotoCategory.Exterior,
    PropertyAssetPhotoCategory.Kitchen,
    PropertyAssetPhotoCategory.Living,
    PropertyAssetPhotoCategory.OtherRooms,
  ];

  return categories[index % 8];
}

function getLandAssetCategory(index: number) {
  const categories = [PropertyAssetPhotoCategory.FRONT_VIEW];

  return categories[index % 1];
}

// ---------------- HOUSE ----------------
export async function generateHouse(): Promise<QueryHousePropertyDto> {
  const { state, grouping_city, city } = getRandomStateCity();
  return {
    id: faker.string.uuid(),
    parcel_id: `PARC-${faker.number.int({ min: 200, max: 1000 })}`,
    slug: faker.lorem.slug(),
    title: faker.company.catchPhrase(),
    short_description: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    images: (await getRandomImages({ query: "house", count: 12 })).map(
      (image, index) => {
        image.category = getHouseAssetCategory(index);

        return image;
      }
    ),
    // Array.from({ length: 3 }, () => ({
    //   url: faker.image.url(),
    //   alt: faker.word.words(2),
    //   category: faker.helpers.arrayElement([
    //     PropertyAssetPhotoCategory.Amenities, PropertyAssetPhotoCategory.Bathroom,
    //     PropertyAssetPhotoCategory.Bedroom, PropertyAssetPhotoCategory.Dining,
    //     PropertyAssetPhotoCategory.Exterior, PropertyAssetPhotoCategory.Kitchen,
    //     PropertyAssetPhotoCategory.Living, PropertyAssetPhotoCategory.OtherRooms
    //   ])
    // })),
    price: Money.from({
      value: faker.number.int({ min: 50000, max: 1000000 }),
      currency: TransactionCurrency.NGN,
    }),
    plot_size: {
      value: faker.number.int({ min: 200, max: 1000 }),
      unit: MeasurementUnit.SQM,
    },
    price_per_sqm: Money.from({
      value: faker.number.int({ min: 200, max: 2000 }),
      currency: TransactionCurrency.NGN,
    }),
    days_on_veriprops: `${faker.number.int({ min: 1, max: 365 })} days`,
    rating: faker.number.float({ min: 2, max: 5, fractionDigits: 1 }),
    reviews_count: faker.number.int({ min: 0, max: 200 }),
    location: {
      address: faker.location.streetAddress(),
      country: "Nigeria",
      state,
      grouping_city,
      city,
      area: faker.word.noun(),
      coordinates: {
        lat: Number(faker.location.latitude()),
        lng: Number(faker.location.longitude()),
      },
    },
    utilities: {
      electricity: faker.datatype.boolean(),
      water: faker.datatype.boolean(),
      road: faker.helpers.arrayElement([RoadState.PAVED, RoadState.UNPAVED]),
      drainage: faker.datatype.boolean(),
      waste_disposal: faker.datatype.boolean(),
      internet: faker.datatype.boolean(),
    },
    verification: {
      verified: faker.datatype.boolean(),
      title_docs: [
        faker.helpers.arrayElement([
          LandTitle.C_OF_O,
          LandTitle.DEED_OF_ASSIGNMENT,
          LandTitle.EXCISION,
          LandTitle.GAZETTE,
          LandTitle.GOVERNOR_CONSENT,
          LandTitle.REGISTERED_TITLE,
          LandTitle.SURVEY_PLAN,
        ]),
      ],
      zoning: faker.helpers.arrayElement([
        PropertyZoning.AGRICULTURAL,
        PropertyZoning.COMMERCIAL,
        PropertyZoning.INDUSTRIAL,
        PropertyZoning.MIXED,
        PropertyZoning.RESIDENTIAL,
      ]),
      development_stage: faker.helpers.arrayElement([
        PropertyStage.BARE_LAND,
        PropertyStage.CLEARED,
        PropertyStage.COMPLETED,
        PropertyStage.FENCED,
        PropertyStage.GATED_ESTATE,
      ]),
    },
    highlights: faker.helpers.arrayElements(
      ["Swimming Pool", "Gym", "Security", "24/7 Water", "Parking"],
      { min: 2, max: 3 }
    ),
    nearby_places: {
      schools: Array.from({ length: 3 }, () => ({
        name: faker.company.name(),
        distance: {
          value: faker.number.int({ min: 100, max: 60000 }),
          unit: MeasurementUnit.METER,
        },
      })),
      hospitals: Array.from({ length: 3 }, () => ({
        name: faker.company.name(),
        distance: {
          value: faker.number.int({ min: 100, max: 60000 }),
          unit: MeasurementUnit.METER,
        },
      })),
      transit: Array.from({ length: 3 }, () => ({
        name: faker.company.name(),
        distance: {
          value: faker.number.int({ min: 100, max: 60000 }),
          unit: MeasurementUnit.METER,
        },
      })),
      places: Array.from({ length: 3 }, () => ({
        name: faker.company.name(),
        distance: {
          value: faker.number.int({ min: 100, max: 60000 }),
          unit: MeasurementUnit.METER,
        },
      })),
    },
    owner: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
    created_at: faker.date.past().toISOString(),

    type: PropertyType.HOUSE,
    home_type: faker.helpers.arrayElement([
      HomeType.APARTMENT,
      HomeType.BUNGALOW,
      HomeType.DETACHED,
      HomeType.DUPLEX,
      HomeType.MANSION,
      HomeType.SEMI_DETACHED,
      HomeType.SHORTLET,
      HomeType.TERRACE,
    ]),
    bedrooms: faker.number.int({ min: 1, max: 6 }),
    bathrooms: faker.number.int({ min: 1, max: 5 }),
    kitchens: faker.number.int({ min: 1, max: 2 }),
    living_areas: faker.number.int({ min: 1, max: 3 }),
    dining_areas: faker.number.int({ min: 1, max: 2 }),
    other_rooms: faker.number.int({ min: 0, max: 2 }),
    year_built: faker.date.past({ years: 30 }).getFullYear(),
    year_last_renovated: faker.date.past({ years: 10 }).getFullYear(),
    interior_description: {
      bedrooms: faker.lorem.sentence(),
      bathrooms: faker.lorem.sentence(),
      flooring: faker.helpers.arrayElement(["tiles", "wood", "marble"]),
      kitchens: faker.lorem.sentence(),
      living_areas: faker.lorem.sentence(),
      dining_areas: faker.lorem.sentence(),
      other_rooms: faker.lorem.sentence(),
    },
    exterior_description: {
      lot_size: {
        value: faker.number.int({ min: 300, max: 1200 }),
        unit: MeasurementUnit.SQM,
      },
      garden: faker.datatype.boolean(),
      fence: faker.helpers.arrayElement(["concrete", "wire", "wood"]),
      balcony: faker.datatype.boolean(),
    },
    parking: {
      spaces: faker.number.int({ min: 1, max: 5 }),
      visitor_parking: faker.datatype.boolean(),
      garage_type: faker.helpers.arrayElement(["attached", "detached", "none"]),
      covered: faker.datatype.boolean(),
      street: faker.datatype.boolean(),
    },
    amenities: faker.helpers.arrayElements(
      ["AC", "Solar Power", "Borehole", "CCTV", "Elevator"],
      { min: 1, max: 4 }
    ),
  };
}

// ---------------- LAND ----------------
export async function generateLand(): Promise<QueryLandPropertyDto> {
  const { state, grouping_city, city } = getRandomStateCity();
  return {
    id: faker.string.uuid(),
    parcel_id: `PARC-${faker.number.int({ min: 200, max: 1000 })}`,
    slug: faker.lorem.slug(),
    title: faker.company.buzzPhrase(),
    short_description: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    images: (await getRandomImages({ query: "land", count: 10 })).map(
      (image, index) => {
        image.category = getLandAssetCategory(index);

        return image;
      }
    ),
    price: Money.from({
      value: faker.number.int({ min: 20000, max: 500000 }),
      currency: TransactionCurrency.NGN,
    }),
    plot_size: {
      value: faker.number.int({ min: 200, max: 2000 }),
      unit: MeasurementUnit.SQM,
    },
    price_per_sqm: Money.from({
      value: faker.number.int({ min: 100, max: 1500 }),
      currency: TransactionCurrency.NGN,
    }),
    days_on_veriprops: `${faker.number.int({ min: 1, max: 365 })} days`,
    rating: faker.number.float({ min: 2, max: 5, fractionDigits: 1 }),
    reviews_count: faker.number.int({ min: 0, max: 200 }),
    location: {
      address: faker.location.streetAddress(),
      country: "Nigeria",
      state,
      grouping_city,
      city,
      area: faker.word.noun(),
      coordinates: {
        lat: Number(faker.location.latitude()),
        lng: Number(faker.location.longitude()),
      },
    },
    utilities: {
      electricity: faker.datatype.boolean(),
      water: faker.datatype.boolean(),
      road: faker.helpers.arrayElement([RoadState.PAVED, RoadState.UNPAVED]),
      drainage: faker.datatype.boolean(),
      waste_disposal: faker.datatype.boolean(),
      internet: faker.datatype.boolean(),
    },
    verification: {
      verified: faker.datatype.boolean(),
      title_docs: [
        faker.helpers.arrayElement([
          LandTitle.C_OF_O,
          LandTitle.DEED_OF_ASSIGNMENT,
          LandTitle.EXCISION,
          LandTitle.GAZETTE,
          LandTitle.GOVERNOR_CONSENT,
          LandTitle.REGISTERED_TITLE,
          LandTitle.SURVEY_PLAN,
        ]),
      ],
      zoning: faker.helpers.arrayElement([
        PropertyZoning.AGRICULTURAL,
        PropertyZoning.COMMERCIAL,
        PropertyZoning.INDUSTRIAL,
        PropertyZoning.MIXED,
        PropertyZoning.RESIDENTIAL,
      ]),
      development_stage: faker.helpers.arrayElement([
        PropertyStage.BARE_LAND,
        PropertyStage.CLEARED,
        PropertyStage.COMPLETED,
        PropertyStage.FENCED,
        PropertyStage.GATED_ESTATE,
      ]),
    },
    highlights: faker.helpers.arrayElements(
      ["Close to main road", "Good drainage", "Fenced", "Dry land"],
      { min: 1, max: 3 }
    ),
    nearby_places: {
      schools: Array.from({ length: 3 }, () => ({
        name: faker.company.name(),
        distance: {
          value: faker.number.int({ min: 100, max: 60000 }),
          unit: MeasurementUnit.METER,
        },
      })),
      hospitals: Array.from({ length: 3 }, () => ({
        name: faker.company.name(),
        distance: {
          value: faker.number.int({ min: 100, max: 60000 }),
          unit: MeasurementUnit.METER,
        },
      })),
      transit: Array.from({ length: 3 }, () => ({
        name: faker.company.name(),
        distance: {
          value: faker.number.int({ min: 100, max: 60000 }),
          unit: MeasurementUnit.METER,
        },
      })),
      places: Array.from({ length: 3 }, () => ({
        name: faker.company.name(),
        distance: {
          value: faker.number.int({ min: 100, max: 60000 }),
          unit: MeasurementUnit.METER,
        },
      })),
    },
    owner: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
    created_at: faker.date.past().toISOString(),

    type: PropertyType.LAND,
    land_type: faker.helpers.arrayElement([
      LandType.AGRICULTURAL,
      LandType.ALLOCATION,
      LandType.COMMERCIAL,
      LandType.CORNER_PIECE,
      LandType.ESTATE_PLOT,
      LandType.INDUSTRIAL,
      LandType.MIXED,
      LandType.RESIDENTIAL,
      LandType.WATER_FRONT,
    ]),
  };
}

// ---------------- READY-TO-USE MUTABLE ARRAY ----------------

// Start empty, mutable array
export let properties: QueryPropertyDto[] = [];

// Kick off async initialization immediately
if (properties.length === 0) {
  (async () => {
    const houses = await Promise.all(
      Array.from({ length: 10 }, () => generateHouse())
    );
    const lands = await Promise.all(
      Array.from({ length: 10 }, () => generateLand())
    );
    properties.push(...houses, ...lands);
  })();
}
