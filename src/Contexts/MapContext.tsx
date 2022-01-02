import React from "react";
import { Coordinate } from "../API/Google Places/Geocoding";

interface MapContextState {
  map: google.maps.Map | undefined;
  center: Coordinate | undefined;
  zoom: number | undefined;
  directions: google.maps.DirectionsResult | undefined;
  setMap: (map: google.maps.Map | undefined) => void;
  setCenter: (center: Coordinate | undefined) => void;
  setZoom: (zoom: number | undefined) => void;
  setDirections: (
    directions: google.maps.DirectionsResult,
    options?: google.maps.DirectionsRendererOptions
  ) => void;
  clearDirections: () => void;
}

const DEFAULT_MAP_CONTEXT_STATE: MapContextState = {
  map: undefined,
  center: undefined,
  zoom: undefined,
  directions: undefined,
  setMap: () => {},
  setCenter: () => {},
  setZoom: () => {},
  setDirections: () => {},
  clearDirections: () => {},
};

export const MapContext = React.createContext(DEFAULT_MAP_CONTEXT_STATE);

export function MapContextProvider({ children }: { children: JSX.Element }) {
  const [map, setMap] = React.useState<google.maps.Map>();
  const [center, setCenter] = React.useState<Coordinate>();
  const [zoom, setZoom] = React.useState<number>();
  const [directions, setDirections] =
    React.useState<google.maps.DirectionsResult>();

  const directionRendererRef = React.useRef(
    new google.maps.DirectionsRenderer()
  );

  const clearDirections = React.useCallback(() => {
    setDirections(undefined);
  }, []);

  // when the map reference changes, update the direction renderer
  React.useEffect(() => {
    if (!map) return;

    directionRendererRef.current.setMap(map);
  }, [map]);

  // when the directions change, render them on the map
  React.useEffect(() => {
    if (!directions) return;
    // TODO: figure out how to hide directions
    directionRendererRef.current.setDirections(directions);
  }, [directions]);

  return (
    <MapContext.Provider
      value={{
        map,
        center,
        zoom,
        directions,
        setMap,
        setCenter,
        setZoom,
        setDirections,
        clearDirections,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
