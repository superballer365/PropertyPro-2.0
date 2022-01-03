import React from "react";
import classNames from "classnames";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faMapMarkerAlt,
  faWalking,
  faCar,
  faSubway,
  faBiking,
} from "@fortawesome/free-solid-svg-icons";
import AddressSearchBar from "../../../../Components/AddressSearchBar";
import { SearchType } from "../../../../API/Google Places";
import styles from "./DirectionsPanel.module.scss";

// copying for shorthand
type TravelMode = google.maps.TravelMode;
const TravelMode = { ...google.maps.TravelMode };

export default function DirectionsForm({ onSearchClick }: IProps) {
  const [origin, setOrigin] = React.useState<string>();
  const [destination, setDestination] = React.useState<string>();
  const [travelMode, setTravelMode] = React.useState<TravelMode>(
    TravelMode.DRIVING
  );

  const handleSearch = () => {
    if (!origin || !destination) return;

    onSearchClick(origin, destination, travelMode);
  };

  return (
    <Form>
      <Form.Group
        controlId="directionsForm.Origin"
        className="d-flex w-100 align-items-center"
      >
        <FontAwesomeIcon
          className="mr-2"
          icon={faMapMarkerAlt}
          color="red"
          title="Origin"
        />
        <AddressSearchBar
          onSelect={(address) => setOrigin(address.name)}
          isInvalid={false}
          searchType={SearchType.Address}
        />
      </Form.Group>
      <Form.Group
        controlId="directionsForm.Destination"
        className="d-flex w-100 align-items-center"
      >
        <FontAwesomeIcon
          className="mr-2"
          icon={faMapMarkerAlt}
          color="red"
          title="Destination"
        />
        <AddressSearchBar
          onSelect={(address) => setDestination(address.name)}
          isInvalid={false}
          searchType={SearchType.Address}
        />
      </Form.Group>
      <div className="d-flex w-100 align-items-center">
        <div className="d-flex align-items-center flex-grow-1">
          {[
            TravelMode.DRIVING,
            TravelMode.TRANSIT,
            TravelMode.WALKING,
            TravelMode.BICYCLING,
          ].map((mode) => (
            <TravelModeButton
              key={mode}
              icon={getIcon(mode)}
              onClick={() => setTravelMode(mode)}
              active={travelMode === mode}
            />
          ))}
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </Form>
  );
}

interface IProps {
  onSearchClick: (
    origin: string,
    destination: string,
    mode: google.maps.TravelMode
  ) => void;
}

function TravelModeButton({ icon, active, onClick }: TravelModeButtonProps) {
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

function getIcon(travelMode: TravelMode): IconProp {
  if (travelMode === TravelMode.BICYCLING) return faBiking;
  if (travelMode === TravelMode.TRANSIT) return faSubway;
  if (travelMode === TravelMode.WALKING) return faWalking;
  return faCar;
}
