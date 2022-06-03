import React from "react";
import { PointOfInterest, Listing } from "../../../Models/Session";
import ListingMarker from "./Listings/ListingMarker";
import PointOfInterestMarker from "./PointsOfInterest/PointOfInterestMarker";

export default function MapMarker(props: MapMarkerProps) {
  const { type, data, ...restProps } = props;

  if (type === MarkerType.Listing) {
    const listing = data as Listing;
    return <ListingMarker listing={listing} {...restProps} />;
  }

  if (type === MarkerType.PointOfInterest) {
    const pointOfInterest = data as PointOfInterest;
    return (
      <PointOfInterestMarker pointOfInterest={pointOfInterest} {...restProps} />
    );
  }

  return null;
}

export interface MapMarkerProps {
  data: Listing | PointOfInterest;
  type: MarkerType;
  hovered?: boolean;
  lat: number;
  lng: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export enum MarkerType {
  Listing,
  PointOfInterest,
}
