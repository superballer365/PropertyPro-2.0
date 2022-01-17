import React from "react";
import { SessionContext } from "../../../../Contexts/SessionContext";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import { User } from "../../../../Models/Session";
import { useUpdateSession } from "../../../../Utils/Hooks";

export default function RoommatesList() {
  const { session } = React.useContext(SessionContext);
  const updateSessionMutation = useUpdateSession();

  const handleDeleteClick = async (user: User) => {
    await updateSessionMutation.mutateAsync({
      ...session,
      roommates: session.roommates?.filter(
        (roommate) => roommate.userName !== user.userName
      ),
    });
  };

  if (!session.roommates || session.roommates.length < 1)
    return <Card.Body>No roommates</Card.Body>;

  return (
    <ListGroup>
      {session.roommates.map((roommate) => (
        <ListGroupItem
          className="d-flex align-items-center"
          key={roommate.userName}
        >
          <span className="flex-grow-1">{roommate.email}</span>
          <Button variant="light" onClick={() => handleDeleteClick(roommate)}>
            <FontAwesomeIcon icon={faTrash} color="red" />
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
