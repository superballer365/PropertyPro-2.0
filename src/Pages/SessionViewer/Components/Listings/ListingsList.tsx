import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import ListingsListItem from "./ListingsListItem";
import styles from "./ListingsList.module.scss";
import ListingFilters from "./ListingFilters";
import {
  ListingContext,
  ListingSortOption,
} from "../../../../Contexts/ListingContext";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";

export default function ListingsList({
  onCreateNewListingClick,
}: IListingsListProps) {
  const { filteredListings } = React.useContext(ListingContext);

  function getContent() {
    if (filteredListings.length < 1) return <Card.Body>No listings</Card.Body>;

    return (
      <ListGroup>
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
              <Accordion.Toggle as={Button} eventKey="0" size="sm">
                <FontAwesomeIcon icon={faFilter} />
              </Accordion.Toggle>
              <ListingSortOptionsDropdown />
              <Button onClick={onCreateNewListingClick} size="sm">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
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
      title={<FontAwesomeIcon icon={faSort} />}
      as={ButtonGroup}
      menuAlign="right"
    >
      {[
        "None",
        "Price (low to high)",
        "Price (high to low)",
        "Beds",
        "Baths",
      ].map((option) => (
        <Dropdown.Item
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
