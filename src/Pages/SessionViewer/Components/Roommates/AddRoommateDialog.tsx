import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { Auth } from "aws-amplify";
import { getUserByEmail } from "../../../../API/AWS Cognito";

export default function AddRoommateDialog({ onClose }: Props) {
  const [email, setEmail] = React.useState("");

  const handleAddClick = async () => {
    const cred = await Auth.currentCredentials();
    const user = await getUserByEmail(email, Auth.essentialCredentials(cred));
    console.log(user);
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
