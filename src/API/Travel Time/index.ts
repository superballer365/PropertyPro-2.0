import axios from "axios";
import { geocodeByAddress } from "../Google Places/Geocoding";

const baseUrl = "https://api.traveltimeapp.com/v4/time-map";

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    "X-Application-Id": process.env.REACT_APP_TRAVEL_TIME_APP_ID,
    "X-Api-Key": process.env.REACT_APP_TRAVEL_TIME_API_KEY,
  },
});

export async function getTravelTimePolygon(
  address: string,
  travelMode: google.maps.TravelMode,
  travelTimeInMinutes: number
) {
  const geocodeResults = await geocodeByAddress(address);
  if (geocodeResults.length === 0)
    throw new Error("Could not find location of address");
  const addressInfo = geocodeResults[0];

  const res = await client.post("", {
    departure_searches: [
      {
        id: "isochrone-0",
        coords: addressInfo.location,
        travel_time: travelTimeInMinutes * 60,
        transportation: {
          type: travelModeFromGoogleMaps(travelMode),
        },
        departure_time: "2022-02-20T14:00:00.000Z",
      },
    ],
  });

  return toGoogleMapsPolygon(res.data.results);
}

function travelModeFromGoogleMaps(travelMode: google.maps.TravelMode): string {
  switch (travelMode) {
    case google.maps.TravelMode.BICYCLING:
      return "cycling";
    case google.maps.TravelMode.WALKING:
      return "walking";
    case google.maps.TravelMode.TRANSIT:
      return "public_transport";
    default:
      return "driving";
  }
}

function toGoogleMapsPolygon(travelTimeResults: any) {
  const color = "#0000ff";

  const paths = travelTimeResults[0].shapes
    .map(function (polygon: any) {
      var shell = polygon.shell;
      var holes = polygon.holes;
      return [shell].concat(holes);
    })
    .map((x: any) => x[0]);

  return new google.maps.Polygon({
    paths,
    strokeColor: color,
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.25,
  });
}
