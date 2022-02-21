import React from "react";
import Button from "react-bootstrap/Button";
import { getTravelTimePolygon } from "../../../../API/Travel Time";
import { MapContext } from "../../../../Contexts/MapContext";

export default function TravelTimePanel() {
  const { map } = React.useContext(MapContext);

  const handleClick = async () => {
    const polygon = await getTravelTimePolygon();

    map && polygon.setMap(map);
  };

  return (
    <div>
      Travel Time<Button onClick={handleClick}>Show</Button>
    </div>
  );
}
