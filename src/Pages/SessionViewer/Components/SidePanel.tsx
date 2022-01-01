import React from "react";
import Nav from "react-bootstrap/Nav";
import ListingsPanel from "./Listings/ListingsPanel";
import PointsOfInterestPanel from "./PointsOfInterest/PointsOfInterestPanel";
import SessionData from "../../../Models/Session";
import styles from "./SidePanel.module.scss";
import classNames from "classnames";
import { ListingContext } from "../../../Contexts/ListingContext";
import { PointOfInterestContext } from "../../../Contexts/PointOfInterestContext";

export default function SidePanel({ session }: IProps) {
  const { selectedListing } = React.useContext(ListingContext);
  const { selectedPointOfInterest } = React.useContext(PointOfInterestContext);
  const [activeTab, setActiveTab] = React.useState<TabOption>("Listings");

  // change active tab when selected listing changes
  React.useEffect(() => {
    if (selectedListing) setActiveTab("Listings");
  }, [selectedListing]);

  // change active tab when selected point of interest changes
  React.useEffect(() => {
    if (selectedPointOfInterest) setActiveTab("POI");
  }, [selectedPointOfInterest]);

  return (
    <div className={styles.container}>
      <Nav variant="tabs">
        {(["Listings", "POI", "Directions"] as TabOption[]).map(
          (option: TabOption) => (
            <Nav.Item>
              <Nav.Link
                active={activeTab === option}
                onClick={() => setActiveTab(option)}
                className={classNames(
                  activeTab === option && styles.activeNavLink
                )}
              >
                {option}
              </Nav.Link>
            </Nav.Item>
          )
        )}
      </Nav>
      <div>
        {activeTab === "Listings" ? (
          <ListingsPanel session={session} />
        ) : activeTab === "POI" ? (
          <PointsOfInterestPanel session={session} />
        ) : null}
      </div>
    </div>
  );
}

type TabOption = "Listings" | "POI" | "Directions";

interface IProps {
  session: SessionData;
}
