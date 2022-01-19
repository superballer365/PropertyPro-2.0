import React from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Listing } from "../../../../Models/Session";
import { ListingContext } from "../../../../Contexts/ListingContext";
import styles from "./ListingsListItem.module.scss";
import classNames from "classnames";

export default function ListingsListItem({ listing }: IListingsListItemProps) {
  const { setSelectedListing, addHoveredListingId, removeHoveredListingId } =
    React.useContext(ListingContext);

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
      <div className="d-flex w-100">
        <span className={classNames("flex-grow-1", styles.name)}>
          {listing.name}
        </span>
        <span>${listing.price}</span>
      </div>
      <div className={styles.details}>
        <div>{`Beds: ${listing.numberOfBedrooms}`}</div>
        <div className="text-center">{`Baths: ${listing.numberOfBathrooms}`}</div>
        {listing.link && (
          <a
            className="text-right"
            href={listing.link}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            Link
          </a>
        )}
      </div>
    </ListGroupItem>
  );
}

interface IListingsListItemProps {
  listing: Listing;
}
