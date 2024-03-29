import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Popover from "react-bootstrap/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRoute,
  faEdit,
  faTrash,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { Listing } from "../../../../Models/Session";
import { useOnClickOutside, useUpdateSession } from "../../../../Utils/Hooks";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { SessionContext } from "../../../../Contexts/SessionContext";
import { ListingContext } from "../../../../Contexts/ListingContext";
import styles from "./ListingMarker.module.scss";
import {
  ButtonWithTooltip,
  ButtonGroupWithTooltip,
} from "../../../../Components/Tooltip";
import { useNavigateWithFocus } from "../../../../Utils/Hooks/useLayoutElementFocus";

export default function ListingMarker({
  hovered,
  listing,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ListingMarkerProps) {
  const [showContextMenu, setShowContextMenu] = React.useState(false);

  return (
    <>
      <FontAwesomeIcon
        className={classNames(styles.container, hovered && styles.hovered)}
        color="green"
        icon={faHome}
        onContextMenu={() => setShowContextMenu((prev) => !prev)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
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
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ListingMarkerContextMenu({
  listing,
  onClose,
}: {
  listing: Listing;
  onClose: () => void;
}) {
  const { session } = React.useContext(SessionContext);
  const { setSelectedListing } = React.useContext(ListingContext);

  const updateSessionMutation = useUpdateSession();
  const navigate = useNavigateWithFocus();
  const popoverRef = React.useRef(null);
  useOnClickOutside(popoverRef, onClose);

  const handleSetDestinationClick = () => {
    onClose();
    navigate("./Directions", "sidebar", {
      state: { destination: listing.address },
    });
  };

  const handleSetOriginClick = () => {
    onClose();
    navigate("./Directions", "sidebar", { state: { origin: listing.address } });
  };

  const handleTravelTimeClick = () => {
    onClose();
    navigate("./TravelTime", "sidebar", { state: { origin: listing.address } });
  };

  const handleEditClick = () => {
    onClose();
    setSelectedListing(listing, { edit: true });
  };

  async function handleDeleteClick() {
    onClose();
    await updateSessionMutation.mutateAsync({
      ...session,
      listings: session.listings!.filter((l) => l.id !== listing.id),
    });
    setSelectedListing(undefined);
  }

  return (
    <div className={styles.contextMenu} onClick={(e) => e.stopPropagation()}>
      <Popover id="popover-basic" ref={popoverRef}>
        <Popover.Title as="h3">{listing.name}</Popover.Title>
        <Popover.Content className="d-flex">
          <ButtonGroup>
            <ButtonWithTooltip
              className={styles.button}
              variant="light"
              elementId={`contextMenuEditListing-${listing.id}`}
              tooltipText="Edit listing"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon icon={faEdit} color="blue" />
            </ButtonWithTooltip>
            <DropdownButton
              className={styles.button}
              as={ButtonGroupWithTooltip}
              elementId={`contextMenuListingDirection-${listing.id}`}
              tooltipText="Get directions"
              variant="light"
              title={
                <span className={styles.button}>
                  <FontAwesomeIcon icon={faRoute} color="blue" />
                </span>
              }
              id="bg-nested-dropdown"
            >
              <Dropdown.Item eventKey="1" onClick={handleSetOriginClick}>
                Set Origin
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={handleSetDestinationClick}>
                Set Destination
              </Dropdown.Item>
            </DropdownButton>
            <ButtonWithTooltip
              className={styles.button}
              variant="light"
              elementId={`contextMenuListingTravelTime-${listing.id}`}
              tooltipText="Get travel time"
              onClick={handleTravelTimeClick}
            >
              <FontAwesomeIcon icon={faStopwatch} color="blue" />
            </ButtonWithTooltip>
            <ButtonWithTooltip
              className={styles.button}
              variant="light"
              elementId={`contextMenuDeleteListing-${listing.id}`}
              tooltipText="Delete listing"
              onClick={handleDeleteClick}
            >
              <FontAwesomeIcon icon={faTrash} color="red" />
            </ButtonWithTooltip>
          </ButtonGroup>
        </Popover.Content>
      </Popover>
    </div>
  );
}
