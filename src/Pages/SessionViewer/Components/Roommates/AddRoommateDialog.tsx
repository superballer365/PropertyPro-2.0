import React from "react";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { useUpdateSession } from "../../../../Utils/Hooks";
import { SessionContext } from "../../../../Contexts/SessionContext";

export default function AddRoommateDialog({ onClose }: Props) {
  const [email, setEmail] = React.useState("");

  const { session } = React.useContext(SessionContext);
  const updateSessionMutation = useUpdateSession();

  const handleAddClick = async () => {
    try {
      await updateSessionMutation.mutateAsync({
        ...session,
        roommates: (session.roommates ?? []).concat(email),
      });
    } catch (e) {
      console.error("Failed to add roommate", e);
      toast.error("Failed to add roommate");
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Roommates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Email</Form.Label>
        <InputGroup>
          <Form.Control
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <InputGroup.Append>
            <Button onClick={handleAddClick}>Add</Button>
          </InputGroup.Append>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface Props {
  onClose: () => void;
}
