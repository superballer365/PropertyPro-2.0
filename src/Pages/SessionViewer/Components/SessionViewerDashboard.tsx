import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { SessionContextProvider } from "../../../Contexts/SessionContext";
import { ListingContextProvider } from "../../../Contexts/ListingContext";
import { PointOfInterestContextProvider } from "../../../Contexts/PointOfInterestContext";
import { MapContextProvider } from "../../../Contexts/MapContext";
import SessionData from "../../../Models/Session";
import SidePanel from "./SidePanel";
import Map from "./Map";
import styles from "./SessionViewerDashboard.module.scss";
import { onUpdateSessionById } from "../../../graphql/subscriptions";
import { useQueryClient } from "react-query";

interface IProps {
  session: SessionData;
}

export default function SessionViewerDashboard({ session }: IProps) {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    (
      API.graphql({
        query: onUpdateSessionById,
        variables: {
          id: session.id,
        },
      }) as any
    ) // TODO: cleanup type
      .subscribe({
        // TODO: maybe only invalidate the current session
        next: (evt: any) => queryClient.invalidateQueries("sessions"),
      });

    return;
  }, [session]);

  return (
    <SessionContextProvider session={session}>
      <MapContextProvider>
        <ListingContextProvider>
          <PointOfInterestContextProvider>
            <div className={styles.container}>
              <SidePanel />
              <div className={styles.mapContainer}>
                <Map />
              </div>
            </div>
          </PointOfInterestContextProvider>
        </ListingContextProvider>
      </MapContextProvider>
    </SessionContextProvider>
  );
}
