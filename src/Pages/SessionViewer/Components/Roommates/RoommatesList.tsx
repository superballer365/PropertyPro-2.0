import React from "react";
import classNames from "classnames";
import { SessionContext } from "../../../../Contexts/SessionContext";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUpdateSession } from "../../../../Utils/Hooks";
import { ButtonWithTooltip } from "../../../../Components/Tooltip";
import styles from "./RoommatesList.module.scss";

export default function RoommatesList() {
  const { session } = React.useContext(SessionContext);
  const updateSessionMutation = useUpdateSession();

  const handleDeleteClick = async (user: string) => {
    await updateSessionMutation.mutateAsync({
      ...session,
      roommates: session.roommates?.filter((roommate) => roommate !== user),
    });
  };

  if (!session.roommates || session.roommates.length < 1)
    return <Card.Body>No roommates</Card.Body>;

  return (
    <ListGroup className="overflow-auto">
      {session.roommates.map((roommate) => (
        <ListGroupItem
          className={classNames("d-flex align-items-center", styles.listItem)}
          key={roommate}
        >
          <span className="flex-grow-1">{roommate}</span>
          <ButtonWithTooltip
            className={styles.deleteButton}
            variant="light"
            elementId={`removeRoommate-${roommate}`}
            tooltipText="Remove roommate"
            onClick={() => handleDeleteClick(roommate)}
          >
            <FontAwesomeIcon icon={faTrash} color="red" />
          </ButtonWithTooltip>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
