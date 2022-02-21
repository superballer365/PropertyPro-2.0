import React from "react";
import { useLocation } from "react-router-dom";
import { IconWithTooltip } from "../../../../Components/Tooltip";
import {
  faMapMarkerAlt,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { SearchType } from "../../../../API/Google Places";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddressSearchBar from "../../../../Components/AddressSearchBar";
import TravelModeButton, { getIcon } from "../Directions/TravelModeButton";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// copying for shorthand
type TravelMode = google.maps.TravelMode;
const TravelMode = { ...google.maps.TravelMode };

export default function TravelTimeForm({ onAddClick }: Props) {
  const [origin, setOrigin] = React.useState<string>();
  const [travelTimeInMin, setTravelTimeInMin] = React.useState<number>();
  const [travelMode, setTravelMode] = React.useState<TravelMode>(
    TravelMode.DRIVING
  );

  const handleAddClick = () => {
    if (!origin || !travelTimeInMin) return;

    onAddClick(origin, travelMode, travelTimeInMin);
    resetOptions();
  };

  const resetOptions = () => {
    setOrigin(undefined);
    setTravelMode(TravelMode.DRIVING);
    setTravelTimeInMin(undefined);
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
          <Form.Group>
            <Form.Label>Travel Time</Form.Label>
            <Form.Control
              type="number"
              placeholder={"maximum travel time in minutes"}
              value={travelTimeInMin ?? ""}
              onChange={(e: any) => setTravelTimeInMin(e.target.value)}
            />
          </Form.Group>
        </div>
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
        <Button onClick={handleAddClick}>Add</Button>
      </div>
    </Form>
  );
}

interface Props {
  onAddClick: (
    address: string,
    travelMode: TravelMode,
    travelTime: number
  ) => void;
}
