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
  lat,
  lng,
  hovered,
  listing,
}: ListingMarkerProps) {
  const [showContextMenu, setShowContextMenu] = React.useState(false);

  const navigate = useNavigate();

  const handleToClick = () => {
    setShowContextMenu(false);
    navigate("./Directions", { state: { destination: listing.address } });
  };

  const handleFromClick = () => {
    setShowContextMenu(false);
    navigate("./Directions", { state: { origin: listing.address } });
  };

  return (
    <>
      <FontAwesomeIcon
        className={classNames(styles.container, hovered && styles.hovered)}
        icon={faHome}
        onContextMenu={() => setShowContextMenu((prev) => !prev)}
      />
      {showContextMenu && (
        <div className={styles.contextMenu}>
          <Button onClick={handleToClick}>To</Button>
          <Button onClick={handleFromClick}>From</Button>
        </div>
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

function ListingMarkerContextMenu({ listing }: { listing: Listing }) {
  return (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{listing.name}</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );
}
