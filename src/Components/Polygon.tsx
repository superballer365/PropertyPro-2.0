import React from "react";
import { MapContext } from "../Contexts/MapContext";

const DEFAULT_OPTIONS: Partial<google.maps.PolygonOptions> = {
  strokeOpacity: 1,
  strokeWeight: 2,
  fillOpacity: 0.25,
};

export default function Polygon({ options }: Props) {
  const { map } = React.useContext(MapContext);

  const polygonRef = React.useRef(
    new google.maps.Polygon({ ...DEFAULT_OPTIONS, ...options })
  );

  // update Polygon map everytime global map changes
  React.useEffect(() => {
    map && polygonRef.current.setMap(map);
  }, [map]);

  // update Polygon options everytime options change
  React.useEffect(() => {
    polygonRef.current.setOptions(options);
  }, [options]);

  // remove polygon from display on component unmount
  React.useEffect(() => {
    return () => {
      polygonRef.current.setMap(null);
    };
  }, []);

  return null;
}

interface Props {
  options: google.maps.PolygonOptions;
}
