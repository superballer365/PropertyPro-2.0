import React from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Listing } from "../../../../Models/Session";
import { ListingContext } from "../../../../Contexts/ListingContext";
import useSelectedListing from "../../../../Utils/Hooks/useSelectedListing";
import styles from "./ListingsListItem.module.scss";

export default function ListingsListItem({ listing }: IListingsListItemProps) {
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
