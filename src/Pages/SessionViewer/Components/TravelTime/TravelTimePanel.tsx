import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import TravelTimeForm from "./TravelTimeForm";
import TravelTimeResult from "./TravelTimeResult";
import { TravelTimeConfig } from "../../../../API/Travel Time";
import styles from "./TravelTimePanel.module.scss";

export default function TravelTimePanel() {
  const [travelTimeConfigs, setTravelTimeConfigs] = React.useState<
    TravelTimeConfig[]
  >([]);

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
