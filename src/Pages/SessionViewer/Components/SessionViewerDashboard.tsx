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
import {
  faMapMarkedAlt,
  faColumns,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
  // We have a focused element (sidebar or map) which is related to, but not necessarily
  // representative of, the sidebarOpen state. On mobile, these two are one in the same.
  // If the sidebar is focused, it's open. On desktop, focusing the sidebar DOES imply the
  // sidebar is open, but focusing the map DOES NOT imply the sidebar is closed.
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [focusedElement, setFocusedElement] =
    React.useState<FocusableElement>("sidebar");

  // TODO: Refactor this nonsense. Too many inter-connected useEffects. Maybe
  // we don't want to use navigation state as the mechanism for changing focus?
  // Maybe we can passively observe the window location and change focus accordinlgy?
  // Maybe we don't need a context to expose functions for changing focus? (I kinda want to keep
  // the context so we don't have to fully rely on navigation for changing forcus)
  const navigationState = useLocation().state as
    | {
        focusElement?: FocusableElement;
      }
    | undefined;

  // Update focused element from navigation state.
  React.useEffect(() => {
    if (!navigationState?.focusElement) return;

    setFocusedElement(navigationState.focusElement);
  }, [navigationState]);

  // When the focused element changes, possibly update sidebarOpen (depends on screen layout).
  React.useEffect(() => {
    if (focusedElement === "sidebar") setSidebarOpen(true);

    if (screenLayout === "mobile" && focusedElement === "map")
      setSidebarOpen(false);
  }, [focusedElement, screenLayout]);

  // When the sidebar is toggled, update the focused element.
  React.useEffect(() => {
    setFocusedElement(sidebarOpen ? "sidebar" : "map");
  }, [sidebarOpen]);

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
                    : styles.desktopContainer
                }
              >
                <div
                  className={classNames(
                    styles.sidebarContainer,
                    !sidebarOpen && styles.closed
                  )}
                >
                  <SidePanel />
                  {screenLayout === "mobile" ? (
                    <OpenMapButton onClick={() => setSidebarOpen(false)} />
                  ) : (
                    <ToggleSidebarButton
                      sidebarOpen={sidebarOpen}
                      onClick={() => setSidebarOpen((prev) => !prev)}
                    />
                  )}
                </div>
                <div className={styles.mapContainer}>
                  <Map />
                  <MapLayerControls />
                  {screenLayout === "mobile" && (
                    <OpenSidebarButton onClick={() => setSidebarOpen(true)} />
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

function OpenSidebarButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className={classNames(styles.toggleViewButton, "shadow-lg")}
      onClick={onClick}
    >
      <FontAwesomeIcon className="pr-2" icon={faColumns} />
      Panel
    </Button>
  );
}

function OpenMapButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className={classNames(styles.toggleViewButton, "shadow-lg")}
      onClick={onClick}
    >
      <FontAwesomeIcon className="pr-2" icon={faMapMarkedAlt} />
      Map
    </Button>
  );
}

function ToggleSidebarButton({
  sidebarOpen,
  onClick,
}: {
  sidebarOpen: boolean;
  onClick: () => void;
}) {
  return (
    <Button className={styles.collapseToggle} variant="light" onClick={onClick}>
      <FontAwesomeIcon icon={sidebarOpen ? faChevronLeft : faChevronRight} />
    </Button>
  );
}
