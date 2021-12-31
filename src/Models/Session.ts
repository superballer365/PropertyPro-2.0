import {
  CreateSessionInput,
  GetSessionQuery,
  ListSessionsQuery,
  UpdateSessionMutation,
  PointOfInterestType,
} from "../API";
import { GraphQLResult } from "@aws-amplify/api";
import { BoundingBox, Coordinate } from "../API/Google Places/Geocoding";

interface SessionData {
  id?: string;
  name: string;
  searchCity: string;
  searchBounds: BoundingBox;
  listings?: Listing[] | null;
  pointsOfInterest?: PointOfInterest[] | null;
}

export interface Listing {
  id: string;
  name: string;
  address: string;
  location: Coordinate;
  price: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
}

export interface PointOfInterest {
  id: string;
  name: string;
  type: PointOfInterestType;
  address: string;
  location: Coordinate;
}

export function sessionDataToApiSessionInput(
  sessionData: SessionData
): CreateSessionInput {
  return {
    name: sessionData.name,
    id: sessionData.id,
    searchCity: sessionData.searchCity,
    searchBounds: sessionData.searchBounds,
    listings: sessionData.listings,
    pointsOfInterest: sessionData.pointsOfInterest,
  };
}

function mapListSessionsQuery(
  listSessionsQuery: GraphQLResult<ListSessionsQuery>
): SessionData[] {
  return (
    listSessionsQuery.data?.listSessions?.items?.map(
      (session) =>
        ({
          id: session?.id,
          name: session?.name,
          searchCity: session?.searchCity,
          searchBounds: session?.searchBounds,
          listings: session?.listings,
          pointsOfInterest: session?.pointsOfInterest,
        } as SessionData)
    ) ?? []
  );
}

function mapGetSessionQuery(
  getSessionQuery: GraphQLResult<GetSessionQuery>
): SessionData | undefined {
  if (!getSessionQuery.data?.getSession) return undefined;
  return getSessionQuery.data.getSession;
}

function mapUpdateSessionMutation(
  updateSessionMutation: GraphQLResult<UpdateSessionMutation>
): SessionData | undefined {
  if (!updateSessionMutation.data?.updateSession) return undefined;
  return updateSessionMutation.data.updateSession;
}

export default SessionData;
export { mapListSessionsQuery as mapListSessions };
export { mapGetSessionQuery as mapGetSession };
export { mapUpdateSessionMutation as mapUpdateSession };
