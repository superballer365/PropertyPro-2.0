import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRoute,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Listing } from "../../../../Models/Session";
import { useOnClickOutside } from "../../../../Utils/Hooks";
import styles from "./ListingMarker.module.scss";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";

export default function ListingMarker({
  hovered,
  listing,
}: ListingMarkerProps) {
  const [showContextMenu, setShowContextMenu] = React.useState(false);

  return (
    <>
      <FontAwesomeIcon
        className={classNames(styles.container, hovered && styles.hovered)}
        icon={faHome}
        onContextMenu={() => setShowContextMenu((prev) => !prev)}
      />
      {showContextMenu && (
        <ListingMarkerContextMenu
          listing={listing}
          onClose={() => setShowContextMenu(false)}
        />
      )}
    </>
  );
}

export interface ListingMarkerProps {
  listing: Listing;
  hovered?: boolean;
  lat: number;
  lng: number;
}

function ListingMarkerContextMenu({
  listing,
  onClose,
}: {
  listing: Listing;
  onClose: () => void;
}) {
  const popoverRef = React.useRef(null);
  useOnClickOutside(popoverRef, onClose);

  const navigate = useNavigate();

  const handleToClick = () => {
    onClose();
    navigate("./Directions", { state: { destination: listing.address } });
  };

  const handleFromClick = () => {
    onClose();
    navigate("./Directions", { state: { origin: listing.address } });
  };
  return (
    <div className={styles.contextMenu}>
      <Popover id="popover-basic" ref={popoverRef}>
        <Popover.Title as="h3">{listing.name}</Popover.Title>
        <Popover.Content className="d-flex">
          <ButtonGroup>
            <Button className={styles.button} variant="light">
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
