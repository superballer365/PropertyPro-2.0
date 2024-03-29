import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEdit,
  faRoute,
  faTrash,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { PointOfInterest } from "../../../../Models/Session";
import styles from "./PointOfInterestMarker.module.scss";
import { useOnClickOutside, useUpdateSession } from "../../../../Utils/Hooks";
import { useNavigate } from "react-router-dom";
import Popover from "react-bootstrap/Popover";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { SessionContext } from "../../../../Contexts/SessionContext";
import { PointOfInterestContext } from "../../../../Contexts/PointOfInterestContext";
import {
  ButtonWithTooltip,
  ButtonGroupWithTooltip,
} from "../../../../Components/Tooltip";
import { useNavigateWithFocus } from "../../../../Utils/Hooks/useLayoutElementFocus";

export default function PointOfInterestMarker({
  lat,
  lng,
  hovered,
  pointOfInterest,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: PointOfInterestMarkerProps) {
  const [showContextMenu, setShowContextMenu] = React.useState(false);
  return (
    <>
      <FontAwesomeIcon
        className={classNames(styles.container, hovered && styles.hovered)}
        icon={faMapMarkerAlt}
        color="red"
        onContextMenu={() => setShowContextMenu(true)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
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
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function PointOfInterestMarkerContextMenu({
  pointOfInterest,
  onClose,
}: {
  pointOfInterest: PointOfInterest;
  onClose: () => void;
}) {
  const { session } = React.useContext(SessionContext);
  const { setSelectedPointOfInterest } = React.useContext(
    PointOfInterestContext
  );

  const updateSessionMutation = useUpdateSession();
  const navigate = useNavigateWithFocus();
  const popoverRef = React.useRef(null);
  useOnClickOutside(popoverRef, onClose);

  const handleSetDestinationClick = () => {
    onClose();
    navigate("./Directions", "sidebar", {
      state: { destination: pointOfInterest.address },
    });
  };

  const handleSetOriginClick = () => {
    onClose();
    navigate("./Directions", "sidebar", {
      state: { origin: pointOfInterest.address },
    });
  };

  const handleTravelTimeClick = () => {
    onClose();
    navigate("./TravelTime", "sidebar", {
      state: { origin: pointOfInterest.address },
    });
  };

  const handleEditClick = () => {
    onClose();
    setSelectedPointOfInterest(pointOfInterest, { edit: true });
  };

  const handleDeleteClick = async () => {
    onClose();
    await updateSessionMutation.mutateAsync({
      ...session,
      pointsOfInterest: session.pointsOfInterest!.filter(
        (p) => p.id !== pointOfInterest.id
      ),
    });
    setSelectedPointOfInterest(undefined);
  };

  return (
    <div className={styles.contextMenu} onClick={(e) => e.stopPropagation()}>
      <Popover id="popover-basic" ref={popoverRef}>
        <Popover.Title as="h3">{pointOfInterest.name}</Popover.Title>
        <Popover.Content className="d-flex">
          <ButtonGroup>
            <ButtonWithTooltip
              className={styles.button}
              variant="light"
              elementId={`contextMenuEditPOI-${pointOfInterest.id}`}
              tooltipText="Edit point of interest"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon icon={faEdit} color="blue" />
            </ButtonWithTooltip>
            <DropdownButton
              className={styles.button}
              as={ButtonGroupWithTooltip}
              elementId={`contextMenuPOIDirections-${pointOfInterest.id}`}
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
              elementId={`contextMenuPOITravelTime-${pointOfInterest.id}`}
              tooltipText="Get travel time"
              onClick={handleTravelTimeClick}
            >
              <FontAwesomeIcon icon={faStopwatch} color="blue" />
            </ButtonWithTooltip>
            <ButtonWithTooltip
              className={styles.button}
              variant="light"
              elementId={`contextMenuDeletePOI-${pointOfInterest.id}`}
              tooltipText="Delete point of interest"
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
