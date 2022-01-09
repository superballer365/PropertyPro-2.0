import React from "react";
import classNames from "classnames";
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMapMarkerAlt,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import ListingsPanel from "./Listings/ListingsPanel";
import PointsOfInterestPanel from "./PointsOfInterest/PointsOfInterestPanel";
import DirectionsPanel from "./Directions/DirectionsPanel";
import SessionData from "../../../Models/Session";
import styles from "./SidePanel.module.scss";

export default function SidePanel({ session }: IProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.container}>
      <Nav variant="tabs">
        {(["Listings", "POI", "Directions"] as TabOption[]).map(
          (option: TabOption) => (
            <Nav.Item key={option}>
              <Nav.Link
                className={classNames(
                  location.pathname.includes(option) && styles.activeNavLink
                )}
                active={location.pathname.includes(option)}
                onClick={() => navigate(option)}
              >
                <FontAwesomeIcon icon={getTabIcon(option)} />
              </Nav.Link>
            </Nav.Item>
          )
        )}
      </Nav>
      <div className={styles.content}>
        <Routes>
          <Route
            path="Listings"
            element={<ListingsPanel session={session} />}
          />
          <Route
            path="POI"
            element={<PointsOfInterestPanel session={session} />}
          />
          <Route path="Directions" element={<DirectionsPanel />} />
          <Route path="*" element={<Navigate to="Listings" />} />
        </Routes>
      </div>
    </div>
  );
}

interface IProps {
  session: SessionData;
}

type TabOption = "Listings" | "POI" | "Directions";

function getTabIcon(tab: TabOption) {
  if (tab === "Listings") return faHome;
  if (tab === "POI") return faMapMarkerAlt;
  return faRoute;
}
