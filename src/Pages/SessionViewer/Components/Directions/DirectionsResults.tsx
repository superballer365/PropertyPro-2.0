import React from "react";

export default function DirectionsResults({
  directions,
  onRouteClick,
}: IProps) {
  if (!directions) return null;
  return (
    <div>
      {directions.routes.map((route: any, index) => (
        <div key={route.summary} onClick={() => onRouteClick(index)}>
          {route.summary}
        </div>
      ))}
    </div>
  );
}

interface IProps {
  directions: google.maps.DirectionsResult | undefined;
  onRouteClick: (routeIndex: number) => void;
}
