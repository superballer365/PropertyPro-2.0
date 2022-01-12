import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import SessionData, { Listing } from "../../../../Models/Session";
import styles from "./ListingsList.module.scss";
import { ListingContext } from "../../../../Contexts/ListingContext";
import { SessionContext } from "../../../../Contexts/SessionContext";
import useSelectedListing from "../../../../Utils/Hooks/useSelectedListing";

export default function ListingsList({
  onCreateNewListingClick,
}: IListingsListProps) {
  const { session } = React.useContext(SessionContext);

  function getContent() {
    if (!session.listings || session.listings.length < 1)
      return <Card.Body>No listings</Card.Body>;

    return (
      <ListGroup>
        {session.listings.map((listing) => (
          <ListingsListItem key={listing.id} listing={listing} />
        ))}
      </ListGroup>
    );
  }

  return (
    <Card className={styles.card}>
      <Card.Header className={styles.header}>
        <span className={styles.title}>Listings</span>
        <Button size="sm" onClick={onCreateNewListingClick}>
          Create
        </Button>
      </Card.Header>
      {getContent()}
    </Card>
  );
}

interface IListingsListProps {
  onCreateNewListingClick: () => void;
}

function ListingsListItem({ listing }: IListingsListItemProps) {
  const { addHoveredListingId, removeHoveredListingId } =
    React.useContext(ListingContext);

  const { setSelectedListing } = useSelectedListing();

  React.useEffect(() => {
    return () => {
      removeHoveredListingId(listing.id);
    };
  }, []);

  function handleClick() {
    setSelectedListing(listing);
  }

  function handleListingHover() {
    addHoveredListingId(listing.id);
  }

  function handleListingUnhover() {
    removeHoveredListingId(listing.id);
  }

  return (
    <ListGroupItem
      className={styles.listItem}
      onClick={handleClick}
      onMouseEnter={handleListingHover}
      onMouseLeave={handleListingUnhover}
    >
      {listing.name}
    </ListGroupItem>
  );
}

interface IListingsListItemProps {
  listing: Listing;
}
