import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Listing } from "../../../../Models/Session";
import styles from "./ListingMarker.module.scss";

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
      <Popover id="popover-basic">
        <Popover.Title as="h3">{listing.name}</Popover.Title>
        <Popover.Content className="d-flex">
          <Button onClick={handleToClick}>To</Button>
          <Button onClick={handleFromClick}>From</Button>
        </Popover.Content>
      </Popover>
    </div>
  );
}
