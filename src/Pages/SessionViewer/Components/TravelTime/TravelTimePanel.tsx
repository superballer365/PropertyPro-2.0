import React from "react";
import { MapContext } from "../../../../Contexts/MapContext";
import TravelTimeForm from "./TravelTimeForm";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import TravelTimeResult from "./TravelTimeResult";
import { TravelTimeConfig } from "../../../../API/Travel Time";
import styles from "./TravelTimePanel.module.scss";

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

  const handleCloseClick = (index: number) => {
    setTravelTimeConfigs((prev) => [...prev.filter((_c, i) => i !== index)]);
  };

  return (
    <div>
      <div className={styles.form}>
        <TravelTimeForm onAddClick={handleAddClick} />
      </div>
      <ListGroup>
        {travelTimeConfigs.map((configuration, index) => (
          <TravelTimeResult
            key={index}
            configuration={configuration}
            color={getColor(index)}
            onCloseClick={() => handleCloseClick(index)}
          />
        ))}
      </ListGroup>
    </div>
  );
}

const colors = ["#0000ff", "#ff0000", "#008000", "#F5A623"];

function getColor(index: number) {
  return colors[index % colors.length];
}
