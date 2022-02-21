import React from "react";
import Button from "react-bootstrap/Button";
import { getTravelTimePolygon } from "../../../../API/Travel Time";
import { MapContext } from "../../../../Contexts/MapContext";

export default function TravelTimePanel() {
  const { showPolygon, removePolygon, clearPolygons } =
    React.useContext(MapContext);

  const [polygon, setPolygon] = React.useState<google.maps.Polygon>();

  React.useEffect(() => {
    return () => clearPolygons();
  }, [clearPolygons]);

  const handleClick = async () => {
    const polygon = await getTravelTimePolygon();
    setPolygon(polygon);
    showPolygon(polygon);
  };

  return (
    <div>
      Travel Time<Button onClick={handleClick}>Show</Button>
      <Button onClick={() => polygon && removePolygon(polygon)}>Clear</Button>
    </div>
  );
}
