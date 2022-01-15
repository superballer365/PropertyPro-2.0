import React from "react";
import GoogleMapReact, { fitBounds } from "google-map-react";
import { Coordinate } from "../../../API/Google Places/Geocoding";
import { ListingContext } from "../../../Contexts/ListingContext";
import { PointOfInterestContext } from "../../../Contexts/PointOfInterestContext";
import MapMarker, { MapMarkerProps, MarkerType } from "./MapMarker";
import { MapContext } from "../../../Contexts/MapContext";
import useSelectedListing from "../../../Utils/Hooks/useSelectedListing";
import { SessionContext } from "../../../Contexts/SessionContext";
import useSelectedPointOfInterest from "../../../Utils/Hooks/useSelectedPointOfInterest";

export default function Map() {
  const { session } = React.useContext(SessionContext);
  const {
    filteredListings,
    hoveredListingIds,
    addHoveredListingId,
    removeHoveredListingId,
  } = React.useContext(ListingContext);
  const {
    hoveredPointOfInterestIds,
    addHoveredPointOfInterestId,
    removeHoveredPointOfInterestId,
  } = React.useContext(PointOfInterestContext);
  const { center, zoom, setMap, setCenter, setZoom } =
    React.useContext(MapContext);

  const { selectedListing, setSelectedListing } = useSelectedListing();
  const { selectedPointOfInterest, setSelectedPointOfInterest } =
    useSelectedPointOfInterest();

  // default zoom and center, to be used for resetting
  const defaultZoomRef = React.useRef<number>();
  const defaultCenterRef = React.useRef<Coordinate>();
  const mapContainerRef = React.useRef<HTMLDivElement>(null);

  // get zoom level and center for map bounds on first load
  const loaded = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (!mapContainerRef.current) return;
    if (loaded.current) return;

    const mapContainerRect = mapContainerRef.current.getBoundingClientRect();
    const { zoom, center } = fitBounds(
      {
        sw: session.searchBounds.bottomLeft,
        ne: session.searchBounds.topRight,
      },
      { width: mapContainerRect?.width, height: mapContainerRect?.height }
    );
    setCenter(center);
    setZoom(zoom);
    defaultCenterRef.current = center;
    defaultZoomRef.current = zoom;
    loaded.current = true;
  }, [session]);

  // update the zoom and center when the selected listing or point of interest changes
  React.useEffect(() => {
    if (selectedListing) {
      setZoom(17);
      setCenter(selectedListing.location);
      return;
    }

    if (selectedPointOfInterest) {
      setZoom(17);
      setCenter(selectedPointOfInterest.location);
      return;
    }

    // reset the zoom and center if no listing is selected
    setZoom(defaultZoomRef.current);
    setCenter(defaultCenterRef.current);
  }, [selectedListing, selectedPointOfInterest]);

  function handleMarkerClick(key: string, markerProps: MapMarkerProps) {
    markerProps.onClick();
  }

  function handleMarkerHover(key: string, markerProps: MapMarkerProps) {
    markerProps.onMouseEnter();
  }

  function handleMarkerUnhover(key: string, markerProps: MapMarkerProps) {
    markerProps.onMouseLeave();
  }

  return (
    <div ref={mapContainerRef} style={{ height: "100%" }}>
      {center && zoom && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY! }}
          center={center}
          zoom={zoom}
          onChildClick={handleMarkerClick}
          onChildMouseEnter={handleMarkerHover}
          onChildMouseLeave={handleMarkerUnhover}
          onGoogleApiLoaded={({ map }) => setMap(map)}
          onChange={({ center, zoom }) => {
            setCenter(center);
            setZoom(zoom);
          }}
          yesIWantToUseGoogleMapApiInternals={true}
          options={{
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: false,
          }}
        >
          {filteredListings.map((listing) => (
            <MapMarker
              key={listing.id}
              type={MarkerType.Listing}
              data={listing}
              hovered={hoveredListingIds.includes(listing.id)}
              lat={listing.location.lat}
              lng={listing.location.lng}
              onClick={() => setSelectedListing(listing)}
              onMouseEnter={() => addHoveredListingId(listing.id)}
              onMouseLeave={() => removeHoveredListingId(listing.id)}
            />
          ))}
          {session.pointsOfInterest?.map((pointOfInterest) => (
            <MapMarker
              key={pointOfInterest.id}
              type={MarkerType.PointOfInterest}
              data={pointOfInterest}
              hovered={hoveredPointOfInterestIds.includes(pointOfInterest.id)}
              lat={pointOfInterest.location.lat}
              lng={pointOfInterest.location.lng}
              onClick={() => setSelectedPointOfInterest(pointOfInterest)}
              onMouseEnter={() =>
                addHoveredPointOfInterestId(pointOfInterest.id)
              }
              onMouseLeave={() =>
                removeHoveredPointOfInterestId(pointOfInterest.id)
              }
            />
          ))}
        </GoogleMapReact>
      )}
    </div>
  );
}
