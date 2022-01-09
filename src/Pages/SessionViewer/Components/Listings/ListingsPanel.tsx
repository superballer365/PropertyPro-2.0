import React from "react";
import styles from "./ListingsPanel.module.scss";
import SessionData from "../../../../Models/Session";
import NewListingDialog from "./NewListingDialog";
import ListingsList from "./ListingsList";
import ListingViewer from "./ListingViewer";
import useSelectedListing from "../../../../Utils/Hooks/useSelectedListing";

export default function ListingsPanel({ session }: IProps) {
  const { selectedListing } = useSelectedListing(session);

  const [creatingNewListing, setCreatingNewListing] = React.useState(false);

  function getContent() {
    // if we have a selected listing, show it
    if (selectedListing)
      return <ListingViewer session={session} listing={selectedListing} />;

    // otherwise, render the list of listings
    return (
      <ListingsList
        onCreateNewListingClick={() => setCreatingNewListing(true)}
        session={session}
      />
    );
  }

  return (
    <>
      {creatingNewListing && (
        <NewListingDialog
          session={session}
          onClose={() => setCreatingNewListing(false)}
        />
      )}
      <div className={styles.container}>{[getContent()]}</div>
    </>
  );
}

interface IProps {
  session: SessionData;
}
