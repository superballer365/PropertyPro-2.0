/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSessionInput = {
  id?: string | null,
  owner?: string | null,
  name: string,
  searchCity: string,
  searchBounds: BoundingBoxInput,
  listings?: Array< ListingInput > | null,
  pointsOfInterest?: Array< PointOfInterestInput > | null,
  roommates?: Array< string > | null,
};

export type BoundingBoxInput = {
  bottomLeft: CoordinateInput,
  topRight: CoordinateInput,
};

export type CoordinateInput = {
  lat: number,
  lng: number,
};

export type ListingInput = {
  id?: string | null,
  name: string,
  address: string,
  location: CoordinateInput,
  price: number,
  squareFootage?: number | null,
  numberOfBedrooms: number,
  numberOfBathrooms: number,
  link?: string | null,
  notes?: string | null,
  pictures?: Array< string > | null,
  status?: ListingStatusType | null,
};

export enum ListingStatusType {
  NEW = "NEW",
  AWAITING_REPLY = "AWAITING_REPLY",
  IN_CONTACT = "IN_CONTACT",
  TOURED = "TOURED",
  APPLIED = "APPLIED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}


export type PointOfInterestInput = {
  id?: string | null,
  name: string,
  type: PointOfInterestType,
  address: string,
  location: CoordinateInput,
};

export enum PointOfInterestType {
  WORK = "WORK",
  OTHER = "OTHER",
}


export type ModelSessionConditionInput = {
  owner?: ModelStringInput | null,
  name?: ModelStringInput | null,
  searchCity?: ModelStringInput | null,
  roommates?: ModelStringInput | null,
  and?: Array< ModelSessionConditionInput | null > | null,
  or?: Array< ModelSessionConditionInput | null > | null,
  not?: ModelSessionConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Session = {
  __typename: "Session",
  id: string,
  owner?: string | null,
  name: string,
  searchCity: string,
  searchBounds: BoundingBox,
  listings?:  Array<Listing > | null,
  pointsOfInterest?:  Array<PointOfInterest > | null,
  roommates?: Array< string > | null,
  createdAt: string,
  updatedAt: string,
};

export type BoundingBox = {
  __typename: "BoundingBox",
  bottomLeft: Coordinate,
  topRight: Coordinate,
};

export type Coordinate = {
  __typename: "Coordinate",
  lat: number,
  lng: number,
};

export type Listing = {
  __typename: "Listing",
  id: string,
  name: string,
  address: string,
  location: Coordinate,
  price: number,
  squareFootage?: number | null,
  numberOfBedrooms: number,
  numberOfBathrooms: number,
  link?: string | null,
  notes?: string | null,
  pictures?: Array< string > | null,
  status?: ListingStatusType | null,
};

export type PointOfInterest = {
  __typename: "PointOfInterest",
  id: string,
  name: string,
  type: PointOfInterestType,
  address: string,
  location: Coordinate,
};

export type UpdateSessionInput = {
  id: string,
  owner?: string | null,
  name?: string | null,
  searchCity?: string | null,
  searchBounds?: BoundingBoxInput | null,
  listings?: Array< ListingInput > | null,
  pointsOfInterest?: Array< PointOfInterestInput > | null,
  roommates?: Array< string > | null,
};

export type DeleteSessionInput = {
  id: string,
};

export type GetListingInfoResponse = {
  __typename: "GetListingInfoResponse",
  address?: string | null,
  price?: number | null,
  numberOfBedrooms?: number | null,
  numberOfBathrooms?: number | null,
  pictures?: Array< string > | null,
};

export type ModelSessionFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  name?: ModelStringInput | null,
  searchCity?: ModelStringInput | null,
  roommates?: ModelStringInput | null,
  and?: Array< ModelSessionFilterInput | null > | null,
  or?: Array< ModelSessionFilterInput | null > | null,
  not?: ModelSessionFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSessionConnection = {
  __typename: "ModelSessionConnection",
  items:  Array<Session | null >,
  nextToken?: string | null,
};

export type CreateSessionMutationVariables = {
  input: CreateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type CreateSessionMutation = {
  createSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    name: string,
    searchCity: string,
    searchBounds:  {
      __typename: "BoundingBox",
      bottomLeft:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      topRight:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    },
    listings?:  Array< {
      __typename: "Listing",
      id: string,
      name: string,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      price: number,
      squareFootage?: number | null,
      numberOfBedrooms: number,
      numberOfBathrooms: number,
      link?: string | null,
      notes?: string | null,
      pictures?: Array< string > | null,
      status?: ListingStatusType | null,
    } > | null,
    pointsOfInterest?:  Array< {
      __typename: "PointOfInterest",
      id: string,
      name: string,
      type: PointOfInterestType,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    } > | null,
    roommates?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSessionMutationVariables = {
  input: UpdateSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type UpdateSessionMutation = {
  updateSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    name: string,
    searchCity: string,
    searchBounds:  {
      __typename: "BoundingBox",
      bottomLeft:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      topRight:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    },
    listings?:  Array< {
      __typename: "Listing",
      id: string,
      name: string,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      price: number,
      squareFootage?: number | null,
      numberOfBedrooms: number,
      numberOfBathrooms: number,
      link?: string | null,
      notes?: string | null,
      pictures?: Array< string > | null,
      status?: ListingStatusType | null,
    } > | null,
    pointsOfInterest?:  Array< {
      __typename: "PointOfInterest",
      id: string,
      name: string,
      type: PointOfInterestType,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    } > | null,
    roommates?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSessionMutationVariables = {
  input: DeleteSessionInput,
  condition?: ModelSessionConditionInput | null,
};

export type DeleteSessionMutation = {
  deleteSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    name: string,
    searchCity: string,
    searchBounds:  {
      __typename: "BoundingBox",
      bottomLeft:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      topRight:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    },
    listings?:  Array< {
      __typename: "Listing",
      id: string,
      name: string,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      price: number,
      squareFootage?: number | null,
      numberOfBedrooms: number,
      numberOfBathrooms: number,
      link?: string | null,
      notes?: string | null,
      pictures?: Array< string > | null,
      status?: ListingStatusType | null,
    } > | null,
    pointsOfInterest?:  Array< {
      __typename: "PointOfInterest",
      id: string,
      name: string,
      type: PointOfInterestType,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    } > | null,
    roommates?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetListingPicturesQueryVariables = {
  listingUrl: string,
};

export type GetListingPicturesQuery = {
  getListingPictures: Array< string >,
};

export type GetListingInfoQueryVariables = {
  listingUrl: string,
};

export type GetListingInfoQuery = {
  getListingInfo:  {
    __typename: "GetListingInfoResponse",
    address?: string | null,
    price?: number | null,
    numberOfBedrooms?: number | null,
    numberOfBathrooms?: number | null,
    pictures?: Array< string > | null,
  },
};

export type GetSessionQueryVariables = {
  id: string,
};

export type GetSessionQuery = {
  getSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    name: string,
    searchCity: string,
    searchBounds:  {
      __typename: "BoundingBox",
      bottomLeft:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      topRight:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    },
    listings?:  Array< {
      __typename: "Listing",
      id: string,
      name: string,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      price: number,
      squareFootage?: number | null,
      numberOfBedrooms: number,
      numberOfBathrooms: number,
      link?: string | null,
      notes?: string | null,
      pictures?: Array< string > | null,
      status?: ListingStatusType | null,
    } > | null,
    pointsOfInterest?:  Array< {
      __typename: "PointOfInterest",
      id: string,
      name: string,
      type: PointOfInterestType,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    } > | null,
    roommates?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSessionsQuery = {
  listSessions?:  {
    __typename: "ModelSessionConnection",
    items:  Array< {
      __typename: "Session",
      id: string,
      owner?: string | null,
      name: string,
      searchCity: string,
      searchBounds:  {
        __typename: "BoundingBox",
        bottomLeft:  {
          __typename: "Coordinate",
          lat: number,
          lng: number,
        },
        topRight:  {
          __typename: "Coordinate",
          lat: number,
          lng: number,
        },
      },
      listings?:  Array< {
        __typename: "Listing",
        id: string,
        name: string,
        address: string,
        location:  {
          __typename: "Coordinate",
          lat: number,
          lng: number,
        },
        price: number,
        squareFootage?: number | null,
        numberOfBedrooms: number,
        numberOfBathrooms: number,
        link?: string | null,
        notes?: string | null,
        pictures?: Array< string > | null,
        status?: ListingStatusType | null,
      } > | null,
      pointsOfInterest?:  Array< {
        __typename: "PointOfInterest",
        id: string,
        name: string,
        type: PointOfInterestType,
        address: string,
        location:  {
          __typename: "Coordinate",
          lat: number,
          lng: number,
        },
      } > | null,
      roommates?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnUpdateSessionByIdSubscriptionVariables = {
  id: string,
};

export type OnUpdateSessionByIdSubscription = {
  onUpdateSessionById?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    name: string,
    searchCity: string,
    searchBounds:  {
      __typename: "BoundingBox",
      bottomLeft:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      topRight:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    },
    listings?:  Array< {
      __typename: "Listing",
      id: string,
      name: string,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      price: number,
      squareFootage?: number | null,
      numberOfBedrooms: number,
      numberOfBathrooms: number,
      link?: string | null,
      notes?: string | null,
      pictures?: Array< string > | null,
      status?: ListingStatusType | null,
    } > | null,
    pointsOfInterest?:  Array< {
      __typename: "PointOfInterest",
      id: string,
      name: string,
      type: PointOfInterestType,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    } > | null,
    roommates?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSessionSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSessionSubscription = {
  onCreateSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    name: string,
    searchCity: string,
    searchBounds:  {
      __typename: "BoundingBox",
      bottomLeft:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      topRight:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    },
    listings?:  Array< {
      __typename: "Listing",
      id: string,
      name: string,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      price: number,
      squareFootage?: number | null,
      numberOfBedrooms: number,
      numberOfBathrooms: number,
      link?: string | null,
      notes?: string | null,
      pictures?: Array< string > | null,
      status?: ListingStatusType | null,
    } > | null,
    pointsOfInterest?:  Array< {
      __typename: "PointOfInterest",
      id: string,
      name: string,
      type: PointOfInterestType,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    } > | null,
    roommates?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSessionSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateSessionSubscription = {
  onUpdateSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    name: string,
    searchCity: string,
    searchBounds:  {
      __typename: "BoundingBox",
      bottomLeft:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      topRight:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    },
    listings?:  Array< {
      __typename: "Listing",
      id: string,
      name: string,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      price: number,
      squareFootage?: number | null,
      numberOfBedrooms: number,
      numberOfBathrooms: number,
      link?: string | null,
      notes?: string | null,
      pictures?: Array< string > | null,
      status?: ListingStatusType | null,
    } > | null,
    pointsOfInterest?:  Array< {
      __typename: "PointOfInterest",
      id: string,
      name: string,
      type: PointOfInterestType,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    } > | null,
    roommates?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSessionSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSessionSubscription = {
  onDeleteSession?:  {
    __typename: "Session",
    id: string,
    owner?: string | null,
    name: string,
    searchCity: string,
    searchBounds:  {
      __typename: "BoundingBox",
      bottomLeft:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      topRight:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    },
    listings?:  Array< {
      __typename: "Listing",
      id: string,
      name: string,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
      price: number,
      squareFootage?: number | null,
      numberOfBedrooms: number,
      numberOfBathrooms: number,
      link?: string | null,
      notes?: string | null,
      pictures?: Array< string > | null,
      status?: ListingStatusType | null,
    } > | null,
    pointsOfInterest?:  Array< {
      __typename: "PointOfInterest",
      id: string,
      name: string,
      type: PointOfInterestType,
      address: string,
      location:  {
        __typename: "Coordinate",
        lat: number,
        lng: number,
      },
    } > | null,
    roommates?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
