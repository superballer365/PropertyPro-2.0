import React from "react";
import { ListingContextProvider } from "../../../Contexts/ListingContext";
import SessionData from "../../../Models/Session";
import SidePanel from "./SidePanel";
import Map from "./Map";
import styles from "./SessionViewerDashboard.module.scss";

interface IProps {
  session: SessionData;
}

export default function SessionViewerDashboard({ session }: IProps) {
  return (
    <ListingContextProvider>
      <div className={styles.container}>
        <SidePanel session={session} />
        <div className={styles.mapContainer}>
          <Map session={session} />
        </div>
      </div>
    </ListingContextProvider>
  );
}
