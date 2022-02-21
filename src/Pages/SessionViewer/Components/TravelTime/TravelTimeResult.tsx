import React from "react";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import {
  TravelTimeConfig,
  getTravelTimePolygon,
  TravelTimeAPIPolygon,
  toGoogleMapsPolygonPath,
} from "../../../../API/Travel Time";
import { getAddressComponents } from "../../../../Utils/address";
import Polygon from "../../../../Components/Polygon";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import { getIcon } from "../Directions/TravelModeButton";
import { formatAMPM } from "../../../../Utils/time";

export default function TravelTimeResult({
  configuration,
  color,
  onCloseClick,
}: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [travelTimePolygon, setTravelTimePolygon] =
    React.useState<TravelTimeAPIPolygon>();

  React.useEffect(() => {
    let isStale = false;

    async function loadTravelTime() {
      try {
        setIsLoading(true);
        const polygon = await getTravelTimePolygon(configuration);
        if (isStale) return;

        setTravelTimePolygon(polygon);
      } catch (e) {
        if (isStale) return;

        setTravelTimePolygon(undefined);
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
  }, [configuration]);

  return (
    <>
      <ListGroupItem
        className="d-flex align-items-center"
        style={{
          borderLeftWidth: 5,
          borderLeftColor: color,
          padding: "0.5rem",
        }}
      >
        <FontAwesomeIcon
          className="mr-3"
          icon={getIcon(configuration.travelMode)}
        />
        <div className="flex-grow-1">
          <div className="font-weight-bold">
            {getAddressComponents(configuration.address).street}
          </div>
          <div className="d-flex justify-content-between">
            <div>{configuration.travelTimeInMinutes} minutes</div>
            <div>{formatAMPM(configuration.departureTime)}</div>
          </div>
        </div>
        <div className="ml-3">
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faTimes}
              onClick={onCloseClick}
            />
          )}
        </div>
      </ListGroupItem>
      {travelTimePolygon && (
        <Polygon
          options={{
            paths: toGoogleMapsPolygonPath(travelTimePolygon),
            fillColor: color,
            strokeColor: color,
          }}
        />
      )}
    </>
  );
}

interface Props {
  configuration: TravelTimeConfig;
  color: string;
  onCloseClick: () => void;
}
