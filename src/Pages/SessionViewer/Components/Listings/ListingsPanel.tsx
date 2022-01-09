import React from "react";
import styles from "./ListingsPanel.module.scss";
import SessionData from "../../../../Models/Session";
import NewListingDialog from "./NewListingDialog";
import ListingsList from "./ListingsList";
import { ListingContext } from "../../../../Contexts/ListingContext";
import ListingViewer from "./ListingViewer";
import { Routes, Route } from "react-router-dom";

export default function ListingsPanel({ session }: IProps) {
  const { selectedListing } = React.useContext(ListingContext);

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
      <div className={styles.container}>
        <Routes>
          <Route
            path=":listingId"
            element={
              <ListingViewer session={session} listing={selectedListing!} />
            }
          />
          <Route
            path=""
            element={
              <ListingsList
                onCreateNewListingClick={() => setCreatingNewListing(true)}
                session={session}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

interface IProps {
  session: SessionData;
}
