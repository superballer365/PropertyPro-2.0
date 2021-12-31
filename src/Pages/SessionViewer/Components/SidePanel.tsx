import React from "react";
import Nav from "react-bootstrap/Nav";
import ListingsPanel from "./Listings/ListingsPanel";
import PointsOfInterestPanel from "./PointsOfInterest/PointsOfInterestPanel";
import SessionData from "../../../Models/Session";
import styles from "./SidePanel.module.scss";
import classNames from "classnames";

export default function SidePanel({ session }: IProps) {
  const [activeTab, setActiveTab] = React.useState<TabOption>("Listings");

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
