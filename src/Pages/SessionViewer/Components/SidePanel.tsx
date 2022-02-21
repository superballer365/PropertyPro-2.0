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
  faDrawPolygon,
} from "@fortawesome/free-solid-svg-icons";
import ListingsPanel from "./Listings/ListingsPanel";
import PointsOfInterestPanel from "./PointsOfInterest/PointsOfInterestPanel";
import DirectionsPanel from "./Directions/DirectionsPanel";
import styles from "./SidePanel.module.scss";
import RoommatesPanel from "./Roommates/RoommatesPanel";
import { NavItemWithTooltip } from "../../../Components/Tooltip";
import TravelTimePanel from "./TravelTime/TravelTimePanel";

export default function SidePanel() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.container}>
      <Nav variant="tabs">
        {(
          [
            "Listings",
            "POI",
            "Directions",
            "TravelTime",
            "Roommates",
          ] as TabOption[]
        ).map((option: TabOption) => (
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
        ))}
      </Nav>
      <div className={styles.content}>
        <Routes>
          <Route path="Listings/*" element={<ListingsPanel />} />
          <Route path="POI/*" element={<PointsOfInterestPanel />} />
          <Route path="Directions" element={<DirectionsPanel />} />
          <Route path="TravelTime" element={<TravelTimePanel />} />
          <Route path="Roommates" element={<RoommatesPanel />} />
          <Route path="*" element={<Navigate to="Listings" />} />
        </Routes>
      </div>
    </div>
  );
}

type TabOption = "Listings" | "POI" | "Directions" | "TravelTime" | "Roommates";

function getTabIcon(tab: TabOption) {
  if (tab === "Listings") return faHome;
  if (tab === "POI") return faMapMarkerAlt;
  if (tab === "Roommates") return faUsers;
  if (tab === "TravelTime") return faDrawPolygon;
  return faRoute;
}

function getTabTooltip(tab: TabOption) {
  if (tab === "Listings") return "Listings";
  if (tab === "POI") return "Points of Interest";
  if (tab === "Roommates") return "Roommates";
  if (tab === "TravelTime") return "Travel Time";
  return "Directions";
}
