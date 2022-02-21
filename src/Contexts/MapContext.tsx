import React from "react";
import { Coordinate } from "../API/Google Places/Geocoding";

interface MapContextState {
  map: google.maps.Map | undefined;
  center: Coordinate | undefined;
  zoom: number | undefined;
  setMap: (map: google.maps.Map | undefined) => void;
  setCenter: (center: Coordinate | undefined) => void;
  setZoom: (zoom: number | undefined) => void;
  showDirections: (
    directions: google.maps.DirectionsResult,
    options?: google.maps.DirectionsRendererOptions
  ) => void;
  clearDirections: () => void;
}

const DEFAULT_MAP_CONTEXT_STATE: MapContextState = {
  map: undefined,
  center: undefined,
  zoom: undefined,
  setMap: () => {},
  setCenter: () => {},
  setZoom: () => {},
  showDirections: () => {},
  clearDirections: () => {},
};

const DEFAULT_DIRECTIONS_RENDER_OPTIONS: google.maps.DirectionsRendererOptions =
  {
    suppressBicyclingLayer: true,
  };

export const MapContext = React.createContext(DEFAULT_MAP_CONTEXT_STATE);

export function MapContextProvider({ children }: { children: JSX.Element }) {
  const [map, setMap] = React.useState<google.maps.Map>();
  const [center, setCenter] = React.useState<Coordinate>();
  const [zoom, setZoom] = React.useState<number>();

  const directionRendererRef = React.useRef(
    new google.maps.DirectionsRenderer()
  );

  const showDirections = React.useCallback(
    (
      directions: google.maps.DirectionsResult,
      options?: google.maps.DirectionsRendererOptions
    ) => {
      directionRendererRef.current.setDirections(directions);
      directionRendererRef.current.setOptions({
        ...DEFAULT_DIRECTIONS_RENDER_OPTIONS,
        ...options,
      });
    },
    []
  );

  const clearDirections = React.useCallback(() => {
    directionRendererRef.current.set("directions", null);
  }, []);

  // when the map reference changes, update the direction renderer
  React.useEffect(() => {
    if (!map) return;

    directionRendererRef.current.setMap(map);
  }, [map]);

  return (
    <MapContext.Provider
      value={{
        map,
        center,
        zoom,
        setMap,
        setCenter,
        setZoom,
        showDirections,
        clearDirections,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
