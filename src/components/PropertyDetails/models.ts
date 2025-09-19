export type PropertyAssetPhoto = {
  id: number;
  url: string;
  category: PropertyAssetPhotoCategory
};

export enum PropertyAssetTab {
    Photos = "Photos",
    FloorPlan = "Floor plan",
    ThreeDtour = "3D Tour",
    StreetView = "Street view",
    Redesign = "Redesign"
}

export enum PropertyAssetPhotoCategory {
    All = "All",
    Kitchen = "Kitchen",
    Bathroom = "Bathroom",
    Bedroom = "Bedroom",
    Living = "Living",
    Dining = "Dining",
    OtherRooms = "Other rooms",
    Exterior = "Exterior",
    Amenities = "Amenities"
}
