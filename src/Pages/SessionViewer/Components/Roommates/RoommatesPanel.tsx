import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddRoommateDialog from "./AddRoommateDialog";
import styles from "./RoommatesPanel.module.scss";
import RoommatesList from "./RoommatesList";

export default function RoommatesPanel() {
  const [addModalOpen, setAddModalOpen] = React.useState(false);

  return (
    <>
      {addModalOpen && (
        <AddRoommateDialog onClose={() => setAddModalOpen(false)} />
      )}
      <Card className={styles.card}>
        <Card.Header>
          <div className={styles.header}>
            <span className={styles.title}>Roommates</span>
            <Button size="sm" onClick={() => setAddModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
        </Card.Header>
        <RoommatesList />
      </Card>
    </>
  );
}
