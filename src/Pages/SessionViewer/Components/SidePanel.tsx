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
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import ListingsPanel from "./Listings/ListingsPanel";
import PointsOfInterestPanel from "./PointsOfInterest/PointsOfInterestPanel";
import DirectionsPanel from "./Directions/DirectionsPanel";
import styles from "./SidePanel.module.scss";
import RoommatesPanel from "./Roommates/RoommatesPanel";
import { NavItemWithTooltip } from "../../../Components/Tooltip";

export default function SidePanel() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.container}>
      <Nav variant="tabs">
        {(["Listings", "POI", "Directions", "Roommates"] as TabOption[]).map(
          (option: TabOption) => (
            <NavItemWithTooltip
              key={option}
              tooltipText={getTabTooltip(option)}
              elementId={option}
            >
              <Nav.Link
                className={classNames(
                  location.pathname.includes(option) && styles.activeNavLink
                )}
                active={location.pathname.includes(option)}
                onClick={() => navigate(option)}
              >
                <FontAwesomeIcon icon={getTabIcon(option)} />
              </Nav.Link>
            </NavItemWithTooltip>
          )
        )}
      </Nav>
      <div className={styles.content}>
        <Routes>
          <Route path="Listings/*" element={<ListingsPanel />} />
          <Route path="POI/*" element={<PointsOfInterestPanel />} />
          <Route path="Directions" element={<DirectionsPanel />} />
          <Route path="Roommates" element={<RoommatesPanel />} />
          <Route path="*" element={<Navigate to="Listings" />} />
        </Routes>
      </div>
    </div>
  );
}

type TabOption = "Listings" | "POI" | "Directions" | "Roommates";

function getTabIcon(tab: TabOption) {
  if (tab === "Listings") return faHome;
  if (tab === "POI") return faMapMarkerAlt;
  if (tab === "Roommates") return faUsers;
  return faRoute;
}

function getTabTooltip(tab: TabOption) {
  if (tab === "Listings") return "Listings";
  if (tab === "POI") return "Points of interest";
  if (tab === "Roommates") return "Roommates";
  return "Directions";
}
