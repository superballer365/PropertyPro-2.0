import React from "react";
import classNames from "classnames";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import styles from "./DirectionsResults.module.scss";

export default function DirectionsResults({
  directions,
  activeRouteIndex,
  onRouteClick,
}: IProps) {
  if (!directions) return null;
  return (
    <ListGroup className="mt-1">
      {directions.routes.map((route: any, index) => (
        <ListGroupItem
          className={classNames(
            styles.container,
            activeRouteIndex === index && styles.active
          )}
          key={route.summary}
          onClick={() => onRouteClick(index)}
        >
          <RouteSummary route={route} />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

interface IProps {
  directions: google.maps.DirectionsResult | undefined;
  activeRouteIndex?: number;
  onRouteClick: (routeIndex: number) => void;
}

function RouteSummary({ route }: { route: google.maps.DirectionsRoute }) {
  const displayInfo = getRouteDisplayInfo(route);

  return (
    <div>
      <div className="font-weight-bold">{displayInfo.summary}</div>
      <div className="d-flex">
        <span className="flex-grow-1">{displayInfo.duration.text}</span>
        <span>{displayInfo.distance.text}</span>
      </div>
    </div>
  );
}

function getRouteDisplayInfo(route: google.maps.DirectionsRoute) {
  const summary = (route as any).summary ? `via ${(route as any).summary}` : "";
  const duration = route.legs[0].duration;
  const distance = route.legs[0].distance;

  return {
    summary,
    duration,
    distance,
  };
}
