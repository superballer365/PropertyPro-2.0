import React from "react";
import styles from "./PointsOfInterestPanel.module.scss";
import SessionData from "../../../../Models/Session";
import NewPointOfInterestDialog from "./NewPointOfInterestDialog";
import PointsOfInterestList from "./PointsOfInterestList";
import { PointOfInterestContext } from "../../../../Contexts/PointOfInterestContext";
import PointOfInterestViewer from "./PointOfInterestViewer";

export default function PointsOfInterestPanel() {
  const { selectedPointOfInterest } = React.useContext(PointOfInterestContext);

  const [creatingNewPointOfInterest, setCreatingNewPointOfInterest] =
    React.useState(false);

  function getContent() {
    // if we have a selected point of interest, show it
    if (selectedPointOfInterest)
      return (
        <PointOfInterestViewer pointOfInterest={selectedPointOfInterest} />
      );

    // otherwise, render the list of point of interest
    return (
      <PointsOfInterestList
        onCreateNewPointOfInterestClick={() =>
          setCreatingNewPointOfInterest(true)
        }
      />
    );
  }

  return (
    <>
      {creatingNewPointOfInterest && (
        <NewPointOfInterestDialog
          onClose={() => setCreatingNewPointOfInterest(false)}
        />
      )}
      <div className={styles.container}>{getContent()}</div>
    </>
  );
}
