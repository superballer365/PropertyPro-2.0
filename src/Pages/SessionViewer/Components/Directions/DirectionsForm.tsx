import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { SearchType } from "../../../../API/Google Places";
import AddressSearchBar from "../../../../Components/AddressSearchBar";
import TravelModeButton, { getIcon } from "./TravelModeButton";

// copying for shorthand
type TravelMode = google.maps.TravelMode;
const TravelMode = { ...google.maps.TravelMode };

export default function DirectionsForm({ onSearchClick }: IProps) {
  const [origin, setOrigin] = React.useState<string>();
  const [destination, setDestination] = React.useState<string>();
  const [travelMode, setTravelMode] = React.useState<TravelMode>(
    TravelMode.DRIVING
  );

  const navigate = useNavigate();
  let navigationState = useLocation().state as
    | {
        origin?: string;
        destination?: string;
      }
    | undefined;
  console.log(navigationState);

  // update origin and destination of they're passed via navigation
  React.useEffect(() => {
    if (!navigationState) return;

    navigationState.origin && setOrigin(navigationState.origin);
    navigationState.destination && setDestination(navigationState.destination);

    return () => (navigationState = undefined);
  }, [navigationState]);

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
          onSelect={(address) => setOrigin(address ? address : undefined)}
          isInvalid={false}
          searchType={SearchType.Address}
          selected={origin}
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
          onSelect={(address) => setDestination(address ? address : undefined)}
          isInvalid={false}
          searchType={SearchType.Address}
          selected={destination}
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
        <Button
          onClick={() =>
            navigate("./", {
              state: { origin: "1325 Boylston Street, Boston, MA" },
            })
          }
        >
          Test
        </Button>
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
