import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import TravelTimeForm from "./TravelTimeForm";
import TravelTimeResult from "./TravelTimeResult";
import { TravelTimeConfig } from "../../../../API/Travel Time";
import styles from "./TravelTimePanel.module.scss";

export default function TravelTimePanel() {
  const [travelTimeConfigs, setTravelTimeConfigs] = React.useState<
    TravelTimeConfigWithId[]
  >([]);

  const configCount = React.useRef(0);

  const handleAddClick = (config: TravelTimeConfig) => {
    setTravelTimeConfigs((prev) => [
      ...prev,
      { ...config, id: configCount.current++ },
    ]);
  };

  const handleCloseClick = (config: TravelTimeConfigWithId) => {
    setTravelTimeConfigs((prev) => [...prev.filter((c) => c.id !== config.id)]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <TravelTimeForm onAddClick={handleAddClick} />
      </div>
      <ListGroup className="overflow-auto">
        {travelTimeConfigs.map((configuration) => (
          <TravelTimeResult
            key={configuration.id}
            configuration={configuration}
            color={getColor(configuration)}
            onCloseClick={() => handleCloseClick(configuration)}
          />
        ))}
      </ListGroup>
    </div>
  );
}

// add a local ID property to the configurations so we can track them consistently
type TravelTimeConfigWithId = TravelTimeConfig & { id: number };

const colors = ["#0000ff", "#ff0000", "#008000", "#F5A623"];

function getColor(configuration: TravelTimeConfigWithId) {
  return colors[configuration.id % colors.length];
}
