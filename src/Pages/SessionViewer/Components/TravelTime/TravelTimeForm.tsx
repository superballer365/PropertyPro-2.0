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
import { TravelTimeConfig } from "../../../../API/Travel Time";

// copying for shorthand
type TravelMode = google.maps.TravelMode;
const TravelMode = { ...google.maps.TravelMode };

export default function TravelTimeForm({ onAddClick }: Props) {
  const [origin, setOrigin] = React.useState<string>();
  const [travelTimeInMinutes, setTravelTimeInMinutes] =
    React.useState<number>();
  const [travelMode, setTravelMode] = React.useState<TravelMode>(
    TravelMode.DRIVING
  );
  const [departureTime, setDepartureTime] = React.useState("08:30");

  const handleAddClick = () => {
    if (!origin || !travelTimeInMinutes) return;

    onAddClick({ address: origin, travelMode, travelTimeInMinutes });
    resetOptions();
  };

  const resetOptions = () => {
    setOrigin(undefined);
    setTravelMode(TravelMode.DRIVING);
    setTravelTimeInMinutes(undefined);
  };

  return (
    <Form>
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">
          <Form.Group controlId="directionsForm.Origin">
            <Form.Label>Origin</Form.Label>
            <AddressSearchBar
              placeholder="Origin of trip"
              isInvalid={false}
              searchType={SearchType.Address}
              selected={origin}
              onSelect={(address) => setOrigin(address ? address : undefined)}
            />
          </Form.Group>
          <div className="d-flex w-100">
            <Form.Group className="flex-grow-1 mr-1">
              <Form.Label>Max Travel Time</Form.Label>
              <Form.Control
                type="number"
                placeholder="travel time (minutes)"
                value={travelTimeInMinutes ?? ""}
                onChange={(e: any) => setTravelTimeInMinutes(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Departure Time</Form.Label>
              <Form.Control
                type="time"
                placeholder="departure time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
              />
            </Form.Group>
          </div>
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
  onAddClick: (config: TravelTimeConfig) => void;
}
