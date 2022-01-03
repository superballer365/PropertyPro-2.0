import React from "react";
import { getDirections } from "../../../../API/Google Routes";
import { MapContext } from "../../../../Contexts/MapContext";
import DirectionsForm from "./DirectionsForm";
import DirectionsResults from "./DirectionsResults";
import styles from "./DirectionsPanel.module.scss";
import LoadingSpinner from "../../../../Components/LoadingSpinner";

export default function DirectionsPanel() {
  const { showDirections, clearDirections } = React.useContext(MapContext);
  const [directions, setDirections] =
    React.useState<google.maps.DirectionsResult>();
  const [routeIndex, setRouteIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  // remove directions when component unmounts
  React.useEffect(() => {
    return () => clearDirections();
  }, []);

  React.useEffect(() => {
    if (!directions) {
      clearDirections();
    } else {
      showDirections(directions, { routeIndex });
    }
  }, [directions, routeIndex]);

  const handleSearch = async (
    origin: string,
    destination: string,
    travelMode: google.maps.TravelMode
  ) => {
    try {
      setLoading(true);
      const directions = await getDirections({
        origin,
        destination,
        travelMode,
      });
      setRouteIndex(0);
      setDirections(directions);
    } catch (error) {
      setDirections(undefined);
      console.error("Failed to load directions: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <DirectionsForm onSearchClick={handleSearch} />
      </div>
      <div className={styles.results}>
        {loading ? <LoadingSpinner /> : <DirectionsResults />}
      </div>
    </div>
  );
}
