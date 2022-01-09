import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEdit,
  faRoute,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { PointOfInterest } from "../../../../Models/Session";
import styles from "./PointOfInterestMarker.module.scss";
import { useOnClickOutside } from "../../../../Utils/Hooks";
import { useNavigate } from "react-router-dom";
import Popover from "react-bootstrap/Popover";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import useSelectedPointOfInterest from "../../../../Utils/Hooks/useSelectedPointOfInterest";

export default function PointOfInterestMarker({
  lat,
  lng,
  hovered,
  pointOfInterest,
}: PointOfInterestMarkerProps) {
  const [showContextMenu, setShowContextMenu] = React.useState(false);
  return (
    <>
      <FontAwesomeIcon
        className={classNames(styles.container, hovered && styles.hovered)}
        icon={faMapMarkerAlt}
        color="red"
        onContextMenu={() => setShowContextMenu(true)}
      />
      {showContextMenu && (
        <PointOfInterestMarkerContextMenu
          pointOfInterest={pointOfInterest}
          onClose={() => setShowContextMenu(false)}
        />
      )}
    </>
  );
}

export interface PointOfInterestMarkerProps {
  pointOfInterest: PointOfInterest;
  hovered?: boolean;
  lat: number;
  lng: number;
}

function PointOfInterestMarkerContextMenu({
  pointOfInterest,
  onClose,
}: {
  pointOfInterest: PointOfInterest;
  onClose: () => void;
}) {
  const popoverRef = React.useRef(null);
  useOnClickOutside(popoverRef, onClose);

  const { setSelectedPointOfInterest } = useSelectedPointOfInterest();

  const navigate = useNavigate();

  const handleToClick = () => {
    onClose();
    navigate("./Directions", {
      state: { destination: pointOfInterest.address },
    });
  };

  const handleFromClick = () => {
    onClose();
    navigate("./Directions", { state: { origin: pointOfInterest.address } });
  };

  const handleEditClick = () => {
    onClose();
    setSelectedPointOfInterest(pointOfInterest, { edit: true });
  };

  return (
    <div className={styles.contextMenu}>
      <Popover id="popover-basic" ref={popoverRef}>
        <Popover.Title as="h3">{pointOfInterest.name}</Popover.Title>
        <Popover.Content className="d-flex">
          <ButtonGroup>
            <Button
              className={styles.button}
              variant="light"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon icon={faEdit} color="blue" />
            </Button>
            <DropdownButton
              className={styles.button}
              as={ButtonGroup}
              variant="light"
              title={
                <span className={styles.button}>
                  <FontAwesomeIcon icon={faRoute} color="blue" />
                </span>
              }
              id="bg-nested-dropdown"
            >
              <Dropdown.Item eventKey="1" onClick={handleToClick}>
                Route To
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={handleFromClick}>
                Route From
              </Dropdown.Item>
            </DropdownButton>
            <Button className={styles.button} variant="light">
              <FontAwesomeIcon icon={faTrash} color="red" />
            </Button>
          </ButtonGroup>
        </Popover.Content>
      </Popover>
    </div>
  );
}
