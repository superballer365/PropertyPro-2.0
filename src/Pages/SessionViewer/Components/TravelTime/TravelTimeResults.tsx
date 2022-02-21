import React from "react";
import { toast } from "react-toastify";
import ListGroup from "react-bootstrap/ListGroup";
import {
  TravelTimeConfig,
  getTravelTimePolygon,
} from "../../../../API/Travel Time";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { MapContext } from "../../../../Contexts/MapContext";
import { getAddressComponents } from "../../../../Utils/address";

export default function TravelTimeResults({ configurations }: Props) {
  return (
    <ListGroup>
      {configurations.map((configuration, index) => (
        <ListGroupItem key={index}>
          <TravelTimeResult
            configuration={configuration}
            color={getColor(index)}
          />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

interface Props {
  configurations: TravelTimeConfig[];
}

function TravelTimeResult({
  configuration,
  color,
}: {
  configuration: TravelTimeConfig;
  color: string;
}) {
  const { showPolygon } = React.useContext(MapContext);

  const [isLoading, setIsLoading] = React.useState(false);
  const [polygon, setPolygon] = React.useState<google.maps.Polygon>();

  React.useEffect(() => {
    let isStale = false;

    async function loadTravelTime() {
      try {
        setIsLoading(true);
        const polygon = await getTravelTimePolygon(configuration);
        polygon.setOptions({ strokeColor: color, fillColor: color });
        if (isStale) return;

        setPolygon(polygon);
        showPolygon(polygon);
      } catch (e) {
        if (isStale) return;

        setPolygon(undefined);
        console.error("Failed to load travel time polygon: ", e);
        toast.error("Failed to load travel time polygon");
      } finally {
        if (!isStale) {
          setIsLoading(false);
        }
      }
    }

    loadTravelTime();

    return () => {
      isStale = true;
    };
  }, [configuration, showPolygon]);

  return (
    <div className="d-flex">
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: color,
        }}
      ></div>
      {isLoading
        ? "...loading"
        : getAddressComponents(configuration.address).street}
    </div>
  );
}

const colors = ["#0000ff", "#ff0000", "#008000", "#F5A623"];

function getColor(index: number) {
  return colors[index % colors.length];
}
