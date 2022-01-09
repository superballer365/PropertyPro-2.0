import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { PointOfInterestContext } from "../../../../Contexts/PointOfInterestContext";
import SessionData, { PointOfInterest } from "../../../../Models/Session";
import { useUpdateSession } from "../../../../Utils/Hooks";
import { getAddressComponents } from "../../../../Utils/address";
import EditPointOfInterestDialog from "./EditPointOfInterestDialog";
import { PointOfInterestType } from "../../../../API";
import { SessionContext } from "../../../../Contexts/SessionContext";

export default function PointOfInterestViewer({ pointOfInterest }: IProps) {
  const { session } = React.useContext(SessionContext);
  const { setSelectedPointOfInterest } = React.useContext(
    PointOfInterestContext
  );

  const [isEditing, setIsEditing] = React.useState(false);

  const updateSessionMutation = useUpdateSession();

  async function handleEditClick() {
    setIsEditing(true);
  }

  async function handleDeleteClick() {
    await updateSessionMutation.mutateAsync({
      ...session,
      pointsOfInterest: session.pointsOfInterest!.filter(
        (p) => p.id !== pointOfInterest.id
      ),
    });
    setSelectedPointOfInterest(undefined);
  }

  getAddressComponents(pointOfInterest.address);

  return (
    <>
      {isEditing && (
        <EditPointOfInterestDialog
          pointOfInterest={pointOfInterest}
          session={session}
          onClose={() => setIsEditing(false)}
        />
      )}
      <Card className="h-100">
        <Card.Header>
          <Button
            className="mr-2"
            size="sm"
            variant="light"
            onClick={() => setSelectedPointOfInterest(undefined)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <span>{pointOfInterest.name}</span>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="col-sm-5">Type:</Col>
            <Col>
              {pointOfInterest.type === PointOfInterestType.WORK
                ? "Work"
                : "Other"}
            </Col>
          </Row>
          <Row>
            <Col className="col-sm-5">Street:</Col>
            <Col>{getAddressComponents(pointOfInterest.address).street}</Col>
          </Row>
          <Row>
            <Col className="col-sm-5">State:</Col>
            <Col>{getAddressComponents(pointOfInterest.address).state}</Col>
          </Row>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <Button className="mr-1" variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

interface IProps {
  pointOfInterest: PointOfInterest;
}
