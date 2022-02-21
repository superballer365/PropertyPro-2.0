import React from "react";
import { toast } from "react-toastify";
import {
  TravelTimeConfig,
  getTravelTimePolygon,
  TravelTimeAPIPolygon,
  toGoogleMapsPolygonPath,
} from "../../../../API/Travel Time";
import { getAddressComponents } from "../../../../Utils/address";
import Polygon from "../../../../Components/Polygon";

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
      <div className="d-flex">
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: color,
          }}
        />
        {isLoading
          ? "...loading"
          : getAddressComponents(configuration.address).street}
        <span onClick={onCloseClick}>X</span>
      </div>
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
