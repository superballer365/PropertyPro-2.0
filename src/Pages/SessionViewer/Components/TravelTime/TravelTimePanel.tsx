import React from "react";
import Button from "react-bootstrap/Button";
import { getTravelTimePolygon } from "../../../../API/Travel Time";
import { MapContext } from "../../../../Contexts/MapContext";
import TravelTimeForm from "./TravelTimeForm";

export default function TravelTimePanel() {
  const { showPolygon, removePolygon, clearPolygons } =
    React.useContext(MapContext);

  const [travelTimeConfig, setTravelTimeConfig] =
    React.useState<TravelTimeConfig>();

  React.useEffect(() => {
    return () => clearPolygons();
  }, [clearPolygons]);

  React.useEffect(() => {
    if (!travelTimeConfig) return;

    getTravelTimePolygon(
      travelTimeConfig.address,
      travelTimeConfig.travelMode,
      travelTimeConfig.travelTimeInMinutes
    ).then((polygon) => showPolygon(polygon));
  }, [travelTimeConfig]);

  const handleAddClick = (
    address: string,
    travelMode: google.maps.TravelMode,
    travelTimeInMinutes: number
  ) => {
    setTravelTimeConfig({ address, travelMode, travelTimeInMinutes });
  };

  return (
    <div>
      <TravelTimeForm onAddClick={handleAddClick} />
    </div>
  );
}

interface TravelTimeConfig {
  address: string;
  travelMode: google.maps.TravelMode;
  travelTimeInMinutes: number;
}
