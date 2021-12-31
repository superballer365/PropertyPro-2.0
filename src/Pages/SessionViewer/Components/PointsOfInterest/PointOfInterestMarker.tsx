import React from "react";
import classNames from "classnames";
import houseImg from "../../../../Images/house.png";
import { Listing } from "../../../../Models/Session";
import styles from "./PointOfInterestMarker.module.scss";

export default function PointOfInterestMarker({
  lat,
  lng,
  hovered,
}: PointOfInterestMarkerProps) {
  return (
    <img
      className={classNames(styles.container, hovered && styles.hovered)}
      src={houseImg}
    />
  );
}

export interface PointOfInterestMarkerProps {
  listing: Listing;
  hovered?: boolean;
  lat: number;
  lng: number;
}
