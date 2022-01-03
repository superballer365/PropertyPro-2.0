import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faWalking,
  faCar,
  faSubway,
  faBiking,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./TravelModeButton.module.scss";

// copying for shorthand
type TravelMode = google.maps.TravelMode;
const TravelMode = { ...google.maps.TravelMode };

export default function TravelModeButton({
  icon,
  active,
  onClick,
}: TravelModeButtonProps) {
  return (
    <div
      className={classNames(styles.travelModeButton, active && styles.active)}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

interface TravelModeButtonProps {
  icon: IconProp;
  active?: boolean;
  onClick: () => void;
}

export function getIcon(travelMode: TravelMode): IconProp {
  if (travelMode === TravelMode.BICYCLING) return faBiking;
  if (travelMode === TravelMode.TRANSIT) return faSubway;
  if (travelMode === TravelMode.WALKING) return faWalking;
  return faCar;
}
