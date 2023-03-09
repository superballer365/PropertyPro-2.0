import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useUpdateSession, useOnClickOutside } from "../../../../Utils/Hooks";
import { SessionContext } from "../../../../Contexts/SessionContext";
import { Listing } from "../../../../Models/Session";
import { ListingContext } from "../../../../Contexts/ListingContext";
import styles from "./ListingDropdown.module.scss";

export default function ListingDropdown({ listing, open, toggleOpen }: Props) {
  const { session } = React.useContext(SessionContext);
  const { setSelectedListing } = React.useContext(ListingContext);

  const dropdownRef = React.useRef(null);

  const updateSessionMutation = useUpdateSession();
  const navigate = useNavigate();
  useOnClickOutside(dropdownRef, () => toggleOpen(false));

  const handleToggleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    toggleOpen(!open);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    handleItemClick(e);
    setSelectedListing(listing, { edit: true });
  };

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    handleItemClick(e);

    await updateSessionMutation.mutateAsync({
      ...session,
      listings: session.listings!.filter((l) => l.id !== listing.id),
    });
  };

  const handleSetDirectionsDestinationClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    handleItemClick(e);
    navigate("./../Directions", { state: { destination: listing.address } });
  };

  const handleSetDirectionsOriginClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    handleItemClick(e);
    navigate("./../Directions", { state: { origin: listing.address } });
  };

  const handleSetTravelTimeOriginClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    handleItemClick(e);
    navigate("./../TravelTime", { state: { origin: listing.address } });
  };

  const handleItemClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    toggleOpen(false);
  };

  return (
    <Dropdown show={open} ref={dropdownRef}>
      <Dropdown.Toggle
        as={CustomToggle}
        id="dropdown-custom-components"
        onClick={handleToggleClick}
      />
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleEditClick}>Edit</Dropdown.Item>
        <Dropdown.Item className="text-danger" onClick={handleDeleteClick}>
          Delete
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Directions</Dropdown.Header>
        <Dropdown.Item onClick={handleSetDirectionsOriginClick}>
          Set Origin
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSetDirectionsDestinationClick}>
          Set Destination
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Travel Time</Dropdown.Header>
        <Dropdown.Item onClick={handleSetTravelTimeOriginClick}>
          Set Origin
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

interface Props {
  listing: Listing;
  open: boolean;
  toggleOpen: (open: boolean) => void;
}

const CustomToggle = React.forwardRef<
  HTMLDivElement | null,
  {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }
>(({ children, onClick }, ref) => (
  <div
    className={classNames("p-1", styles.dropdownToggle)}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <FontAwesomeIcon color="gray" icon={faEllipsisV} size="lg" />
    {children}
  </div>
));
