import React from "react";
import classNames from "classnames";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Listing } from "../../../../Models/Session";
import { ListingContext } from "../../../../Contexts/ListingContext";
import ListingDropdown from "./ListingDropdown";
import styles from "./ListingsListItem.module.scss";
import ListingStatusBadge from "./ListingStatusBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export default function ListingsListItem({ listing }: IListingsListItemProps) {
  const {
    setSelectedListing,
    hoveredListingIds,
    addHoveredListingId,
    removeHoveredListingId,
  } = React.useContext(ListingContext);

  const [menuOpen, setMenuOpen] = React.useState(false);

  const hovered = React.useMemo(
    () => hoveredListingIds.includes(listing.id),
    [listing.id, hoveredListingIds]
  );

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
      onContextMenu={(e) => {
        e.preventDefault();
        setMenuOpen(true);
      }}
    >
      <div>
        <div className="d-flex w-100 mb-1">
          <span className={classNames("flex-grow-1", styles.name)}>
            {listing.name}
            {hovered && listing.link && (
              <a
                className="pl-3"
                href={listing.link}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            )}
          </span>
          <span>${listing.price}</span>
        </div>
        <div className={styles.details}>
          <div className="text-left">{`${listing.numberOfBedrooms} bd | 
          ${listing.numberOfBathrooms} ba | ${
            listing.squareFootage ?? "--"
          } sqft`}</div>
          <ListingStatusBadge status={listing.status} />
        </div>
      </div>
      <div className={styles.moreButton}>
        <ListingDropdown
          listing={listing}
          open={menuOpen}
          toggleOpen={setMenuOpen}
        />
      </div>
    </ListGroupItem>
  );
}

interface IListingsListItemProps {
  listing: Listing;
}
