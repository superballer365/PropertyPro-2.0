import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import SessionData, { PointOfInterest } from "../../../../Models/Session";
import styles from "./PointsOfInterestList.module.scss";
import { PointOfInterestContext } from "../../../../Contexts/PointOfInterestContext";

export default function PointsOfInterestList({
  session,
  onCreateNewPointOfInterestClick,
}: IPointsOfInterestListProps) {
  function getContent() {
    if (!session.pointsOfInterest || session.pointsOfInterest.length < 1)
      return <Card.Body>No points of interest</Card.Body>;

    return (
      <ListGroup>
        {session.pointsOfInterest.map((pointOfInterest) => (
          <PointsOfInterestListItem
            key={pointOfInterest.id}
            pointOfInterest={pointOfInterest}
          />
        ))}
      </ListGroup>
    );
  }

  return (
    <Card className={styles.card}>
      <Card.Header className={styles.header}>
        <span className={styles.title}>Points of Interest</span>
        <Button size="sm" onClick={onCreateNewPointOfInterestClick}>
          +
        </Button>
      </Card.Header>
      {getContent()}
    </Card>
  );
}

interface IPointsOfInterestListProps {
  session: SessionData;
  onCreateNewPointOfInterestClick: () => void;
}

function PointsOfInterestListItem({
  pointOfInterest,
}: IPointsOfInterestListItemProps) {
  const {
    setSelectedPointOfInterest,
    addHoveredPointOfInterestId,
    removeHoveredPointOfInterestId,
  } = React.useContext(PointOfInterestContext);

  React.useEffect(() => {
    return () => {
      removeHoveredPointOfInterestId(pointOfInterest.id);
    };
  }, []);

  function handleClick() {
    setSelectedPointOfInterest(pointOfInterest);
  }

  function handlePointOfInterestHover() {
    addHoveredPointOfInterestId(pointOfInterest.id);
  }

  function handlePointOfInterestUnhover() {
    removeHoveredPointOfInterestId(pointOfInterest.id);
  }

  return (
    <ListGroupItem
      className={styles.listItem}
      onClick={handleClick}
      onMouseEnter={handlePointOfInterestHover}
      onMouseLeave={handlePointOfInterestUnhover}
    >
      {pointOfInterest.name}
    </ListGroupItem>
  );
}

interface IPointsOfInterestListItemProps {
  pointOfInterest: PointOfInterest;
}
