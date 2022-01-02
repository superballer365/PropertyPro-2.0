import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Listing } from "../../../../Models/Session";
import styles from "./ListingMarker.module.scss";

export default function ListingMarker({
  lat,
  lng,
  hovered,
}: ListingMarkerProps) {
  return (
    <FontAwesomeIcon
      className={classNames(styles.container, hovered && styles.hovered)}
      icon={faHome}
    />
  );
}

export interface ListingMarkerProps {
  listing: Listing;
  hovered?: boolean;
  lat: number;
  lng: number;
}
