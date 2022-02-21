import React from "react";
import { MapContext } from "../../../../Contexts/MapContext";
import TravelTimeForm from "./TravelTimeForm";
import TravelTimeResults from "./TravelTimeResults";

export default function TravelTimePanel() {
  const { clearPolygons } = React.useContext(MapContext);

  const [travelTimeConfigs, setTravelTimeConfigs] = React.useState<
    TravelTimeConfig[]
  >([]);

  React.useEffect(() => {
    return () => clearPolygons();
  }, [clearPolygons]);

  const handleAddClick = (config: TravelTimeConfig) => {
    setTravelTimeConfigs((prev) => [...prev, config]);
  };

  return (
    <div>
      <TravelTimeForm onAddClick={handleAddClick} />
      <TravelTimeResults configurations={travelTimeConfigs} />
    </div>
  );
}

interface TravelTimeConfig {
  address: string;
  travelMode: google.maps.TravelMode;
  travelTimeInMinutes: number;
}
