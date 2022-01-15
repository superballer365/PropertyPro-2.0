import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import ListingsListItem from "./ListingsListItem";
import styles from "./ListingsList.module.scss";
import ListingFilters from "./ListingFilters";
import { ListingContext } from "../../../../Contexts/ListingContext";

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
