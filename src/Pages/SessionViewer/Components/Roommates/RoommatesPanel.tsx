import React from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddRoommateDialog from "./AddRoommateDialog";
import RoommatesList from "./RoommatesList";
import { ButtonWithTooltip } from "../../../../Components/Tooltip";
import styles from "./RoommatesPanel.module.scss";

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
            <ButtonWithTooltip
              size="sm"
              elementId="addRoommate"
              tooltipText="Add roommates"
              onClick={() => setAddModalOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </ButtonWithTooltip>
          </div>
        </Card.Header>
        <RoommatesList />
      </Card>
    </>
  );
}
