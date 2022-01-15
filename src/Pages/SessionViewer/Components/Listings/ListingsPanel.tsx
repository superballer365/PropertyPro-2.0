import React from "react";
import styles from "./ListingsPanel.module.scss";
import NewListingDialog from "./NewListingDialog";
import ListingsList from "./ListingsList";
import ListingViewer from "./ListingViewer";
import { ListingContext } from "../../../../Contexts/ListingContext";

export default function ListingsPanel() {
  const { selectedListing } = React.useContext(ListingContext);

  const [creatingNewListing, setCreatingNewListing] = React.useState(false);

  function getContent() {
    // if we have a selected listing, show it
    if (selectedListing) return <ListingViewer listing={selectedListing} />;

    // otherwise, render the list of listings
    return (
      <ListingsList
        onCreateNewListingClick={() => setCreatingNewListing(true)}
      />
    );
  }

  return (
    <>
      {creatingNewListing && (
        <NewListingDialog onClose={() => setCreatingNewListing(false)} />
      )}
      <div className={styles.container}>{[getContent()]}</div>
    </>
  );
}
