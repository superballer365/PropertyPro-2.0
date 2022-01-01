import React from "react";
import classNames from "classnames";
import pointOfInterestImg from "../../../../Images/pointOfInterest.png";
import { PointOfInterest } from "../../../../Models/Session";
import styles from "./PointOfInterestMarker.module.scss";

export default function PointOfInterestMarker({
  lat,
  lng,
  hovered,
}: PointOfInterestMarkerProps) {
  return (
    <img
      className={classNames(styles.container, hovered && styles.hovered)}
      src={pointOfInterestImg}
    />
  );
}

export interface PointOfInterestMarkerProps {
  pointOfInterest: PointOfInterest;
  hovered?: boolean;
  lat: number;
  lng: number;
}
