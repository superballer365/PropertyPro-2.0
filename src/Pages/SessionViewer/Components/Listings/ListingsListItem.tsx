import React from "react";
import classNames from "classnames";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Listing } from "../../../../Models/Session";
import { ListingContext } from "../../../../Contexts/ListingContext";
import ListingDropdown from "./ListingDropdown";
import styles from "./ListingsListItem.module.scss";
import ListingStatusBadge from "./ListingStatusBadge";

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
      <div>
        <div className="d-flex w-100 mb-1">
          <span className={classNames("flex-grow-1", styles.name)}>
            {listing.name}
          </span>
          <span>${listing.price}</span>
        </div>
        <div className={styles.details}>
          <ListingStatusBadge status={listing.status} />
          <div className="text-center">{`${listing.numberOfBedrooms} bd | ${listing.numberOfBathrooms} ba`}</div>
          <div className="text-right">
            {listing.link ? (
              <a
                className="text-right"
                href={listing.link}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                Link
              </a>
            ) : (
              <>No Link</>
            )}
          </div>
        </div>
      </div>
      <div className={styles.moreButton}>
        <ListingDropdown listing={listing} />
      </div>
    </ListGroupItem>
  );
}

interface IListingsListItemProps {
  listing: Listing;
}
