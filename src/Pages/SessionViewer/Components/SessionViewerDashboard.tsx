import React from "react";
import Observable, { ZenObservable } from "zen-observable-ts";
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
import MapLayerControls from "./MapLayerControls";
import { useLocation } from "react-router-dom";
import { LayoutContext } from "../../../Contexts/LayoutContext";
import classNames from "classnames";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt, faColumns } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  session: SessionData;
}

type FocusableElement = "sidebar" | "map";

interface SessionViewerLayoutContextState {
  focusedElement: FocusableElement;
  setFocusedElement: (element: FocusableElement) => void;
}

export const SessionViewerLayoutContext =
  React.createContext<SessionViewerLayoutContextState>({
    focusedElement: "sidebar",
    setFocusedElement: () => {},
  });

export default function SessionViewerDashboard({ session }: IProps) {
  const { screenLayout } = React.useContext(LayoutContext);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [focusedElement, setFocusedElement] =
    React.useState<FocusableElement>("sidebar");

  const navigationState = useLocation().state as
    | {
        focusElement?: FocusableElement;
      }
    | undefined;

  React.useEffect(() => {
    if (!navigationState?.focusElement) return;

    setFocusedElement(navigationState.focusElement);
  }, [navigationState]);

  React.useEffect(() => {
    if (focusedElement === "sidebar") setSidebarOpen(true);

    if (screenLayout === "mobile" && focusedElement === "map")
      setSidebarOpen(false);
  }, [focusedElement, screenLayout]);

  const queryClient = useQueryClient();

  React.useEffect(() => {
    let subscription: ZenObservable.Subscription | undefined;

    async function setup() {
      const observable = await API.graphql({
        query: onUpdateSessionById,
        variables: {
          id: session.id,
        },
      });
      if (!(observable instanceof Observable)) return;

      subscription = observable.subscribe({
        next: (evt: any) => queryClient.invalidateQueries("sessions"),
      });
    }

    setup();

    return () => {
      subscription && subscription.unsubscribe();
    };
  }, [session]);

  return (
    <SessionContextProvider session={session}>
      <SessionViewerLayoutContext.Provider
        value={{ focusedElement, setFocusedElement }}
      >
        <MapContextProvider>
          <ListingContextProvider>
            <PointOfInterestContextProvider>
              <div
                className={
                  screenLayout === "mobile"
                    ? styles.mobileContainer
                    : styles.container
                }
              >
                <div
                  className={classNames(
                    styles.sidebarContainer,
                    !sidebarOpen && styles.closed
                  )}
                >
                  <SidePanel open={sidebarOpen} setOpen={setSidebarOpen} />
                  {screenLayout === "mobile" && (
                    <Button
                      className={classNames(
                        styles.toggleViewButton,
                        "shadow-lg"
                      )}
                      onClick={() => {
                        setFocusedElement("map");
                        setSidebarOpen(false);
                      }}
                    >
                      <FontAwesomeIcon className="pr-2" icon={faMapMarkedAlt} />
                      Map
                    </Button>
                  )}
                </div>
                <div className={styles.mapContainer}>
                  <Map />
                  <MapLayerControls />
                  {screenLayout === "mobile" && (
                    <Button
                      className={classNames(
                        styles.toggleViewButton,
                        "shadow-lg"
                      )}
                      onClick={() => {
                        setFocusedElement("sidebar");
                        setSidebarOpen(false);
                      }}
                    >
                      <FontAwesomeIcon className="pr-2" icon={faColumns} />
                      Panel
                    </Button>
                  )}
                </div>
              </div>
            </PointOfInterestContextProvider>
          </ListingContextProvider>
        </MapContextProvider>
      </SessionViewerLayoutContext.Provider>
    </SessionContextProvider>
  );
}
