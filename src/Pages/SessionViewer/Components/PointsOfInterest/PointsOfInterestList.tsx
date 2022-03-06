import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { PointOfInterest } from "../../../../Models/Session";
import { PointOfInterestContext } from "../../../../Contexts/PointOfInterestContext";
import { SessionContext } from "../../../../Contexts/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ButtonWithTooltip } from "../../../../Components/Tooltip";
import PointOfInterestDropdown from "./PointOfInterestDropdown";
import styles from "./PointsOfInterestList.module.scss";

export default function PointsOfInterestList({
  onCreateNewPointOfInterestClick,
}: IPointsOfInterestListProps) {
  const { session } = React.useContext(SessionContext);

  function getContent() {
    if (!session.pointsOfInterest || session.pointsOfInterest.length < 1)
      return <Card.Body>No points of interest</Card.Body>;

    return (
      <ListGroup className={styles.list}>
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
        <ButtonWithTooltip
          size="sm"
          tooltipText="Create new point of interest"
          elementId="createPointOfInterest"
          onClick={onCreateNewPointOfInterestClick}
        >
          <FontAwesomeIcon icon={faPlus} />
        </ButtonWithTooltip>
      </Card.Header>
      {getContent()}
    </Card>
  );
}

interface IPointsOfInterestListProps {
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
      <div className="d-flex justify-content-between">
        {pointOfInterest.name}
        <div className={styles.moreButton}>
          <PointOfInterestDropdown pointOfInterest={pointOfInterest} />
        </div>
      </div>
    </ListGroupItem>
  );
}

interface IPointsOfInterestListItemProps {
  pointOfInterest: PointOfInterest;
}
