import React from "react";
import ReactTooltip from "react-tooltip";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";
import ListingsListItem from "./ListingsListItem";
import ListingFilters from "./ListingFilters";
import {
  ListingContext,
  ListingSortOption,
} from "../../../../Contexts/ListingContext";
import {
  ButtonWithTooltip,
  ButtonGroupWithTooltip,
} from "../../../../Components/Tooltip";
import styles from "./ListingsList.module.scss";

export default function ListingsList({
  onCreateNewListingClick,
}: IListingsListProps) {
  const { filteredListings } = React.useContext(ListingContext);

  function getContent() {
    if (filteredListings.length < 1) return <Card.Body>No listings</Card.Body>;

    return (
      <ListGroup className={styles.list}>
        {filteredListings.map((listing) => (
          <ListingsListItem key={listing.id} listing={listing} />
        ))}
      </ListGroup>
    );
  }

  return (
    <Card className={styles.card}>
      <Card.Header>
        <Accordion>
          <div className={styles.header}>
            <span className={styles.title}>Listings</span>
            <ButtonGroup>
              <Accordion.Toggle
                elementId="listingFilter"
                tooltipText="Filter listings"
                as={ButtonWithTooltip}
                eventKey="0"
                size="sm"
              >
                <FontAwesomeIcon icon={faFilter} />
              </Accordion.Toggle>
              <ReactTooltip />
              <ListingSortOptionsDropdown />
              <ButtonWithTooltip
                size="sm"
                elementId="newListingButton"
                tooltipText="Create new listing"
                onClick={onCreateNewListingClick}
              >
                <FontAwesomeIcon icon={faPlus} />
              </ButtonWithTooltip>
            </ButtonGroup>
          </div>
          <Accordion.Collapse eventKey="0">
            <ListingFilters />
          </Accordion.Collapse>
        </Accordion>
      </Card.Header>
      {getContent()}
    </Card>
  );
}

interface IListingsListProps {
  onCreateNewListingClick: () => void;
}

function ListingSortOptionsDropdown() {
  const { sortOption, setSortOption } = React.useContext(ListingContext);

  return (
    <DropdownButton
      title={<FontAwesomeIcon icon={faSortAmountDown} />}
      as={ButtonGroupWithTooltip}
      size="sm"
      elementId="sortListings"
      tooltipText="Sort listings"
      menuAlign="right"
    >
      {[
        "None",
        "Price (low to high)",
        "Price (high to low)",
        "Beds",
        "Baths",
        "Size",
      ].map((option) => (
        <Dropdown.Item
          className={styles.dropdownItem}
          as={Button}
          onClick={() => setSortOption(option as ListingSortOption)}
          active={option === sortOption}
        >
          {option}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}
