import React from "react";
import { getDirections } from "../../../../API/Google Routes";
import { MapContext } from "../../../../Contexts/MapContext";

export default function DirectionsPanel() {
  const { setDirections } = React.useContext(MapContext);

  React.useEffect(() => {
    const request = {
      origin: "187 I Street Boston, MA",
      destination: "1325 Boylston Street Boston, MA",
      travelMode: google.maps.TravelMode.DRIVING,
    };

    getDirections(request).then((result) => setDirections(result));
  }, []);

  return <div>directions</div>;
}
