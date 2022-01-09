import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { PointOfInterest } from "../../../../Models/Session";
import styles from "./PointOfInterestMarker.module.scss";

export default function PointOfInterestMarker({
  lat,
  lng,
  hovered,
}: PointOfInterestMarkerProps) {
  return (
    <FontAwesomeIcon
      className={classNames(styles.container, hovered && styles.hovered)}
      icon={faMapMarkerAlt}
      color="red"
    />
  );
}

export interface PointOfInterestMarkerProps {
  pointOfInterest: PointOfInterest;
  hovered?: boolean;
  lat: number;
  lng: number;
}
