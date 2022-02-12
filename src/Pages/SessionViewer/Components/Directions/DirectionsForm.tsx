import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  faMapMarkerAlt,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchType } from "../../../../API/Google Places";
import AddressSearchBar from "../../../../Components/AddressSearchBar";
import TravelModeButton, { getIcon } from "./TravelModeButton";
import { IconWithTooltip } from "../../../../Components/Tooltip";
import styles from "./DirectionsForm.module.scss";

// copying for shorthand
type TravelMode = google.maps.TravelMode;
const TravelMode = { ...google.maps.TravelMode };

export default function DirectionsForm({ onSearchClick }: IProps) {
  const [origin, setOrigin] = React.useState<string>();
  const [destination, setDestination] = React.useState<string>();
  const [travelMode, setTravelMode] = React.useState<TravelMode>(
    TravelMode.DRIVING
  );

  let navigationState = useLocation().state as
    | {
        origin?: string;
        destination?: string;
      }
    | undefined;

  // update origin and destination of they're passed via navigation
  React.useEffect(() => {
    if (!navigationState) return;

    navigationState.origin && setOrigin(navigationState.origin);
    navigationState.destination && setDestination(navigationState.destination);
  }, [navigationState]);

  const handleSearch = () => {
    if (!origin || !destination) return;

    onSearchClick(origin, destination, travelMode);
  };

  const handleSwapLocationsClick = () => {
    const oldOrigin = origin;
    const oldDestination = destination;
    setDestination(oldOrigin);
    setOrigin(oldDestination);
  };

  return (
    <Form>
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">
          <Form.Group
            controlId="directionsForm.Origin"
            className="d-flex w-100 align-items-center"
          >
            <IconWithTooltip
              className="mr-2"
              icon={faMapMarkerAlt}
              color="red"
              elementId="origin"
              tooltipText="Origin"
            />
            <AddressSearchBar
              placeholder="Origin of trip"
              isInvalid={false}
              searchType={SearchType.Address}
              selected={origin}
              onSelect={(address) => setOrigin(address ? address : undefined)}
            />
          </Form.Group>
          <Form.Group
            controlId="directionsForm.Destination"
            className="d-flex w-100 align-items-center"
          >
            <IconWithTooltip
              className="mr-2"
              icon={faMapMarkerAlt}
              color="red"
              elementId="destination"
              tooltipText="Destination"
            />
            <AddressSearchBar
              placeholder="Destination of trip"
              isInvalid={false}
              searchType={SearchType.Address}
              selected={destination}
              onSelect={(address) =>
                setDestination(address ? address : undefined)
              }
            />
          </Form.Group>
        </div>
        <FontAwesomeIcon
          className={styles.switchButton}
          icon={faExchangeAlt}
          onClick={handleSwapLocationsClick}
        />
      </div>
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
