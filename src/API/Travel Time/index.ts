import axios from "axios";

const baseUrl = "https://api.traveltimeapp.com/v4/time-map";

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    "X-Application-Id": process.env.REACT_APP_TRAVEL_TIME_APP_ID,
    "X-Api-Key": process.env.REACT_APP_TRAVEL_TIME_API_KEY,
  },
});

export async function getTravelTimePolygon() {
  const res = await client.post("", {
    departure_searches: [
      {
        id: "isochrone-0",
        coords: {
          lat: 42.3330372,
          lng: -71.0398933,
        },
        travel_time: 1800,
        transportation: {
          type: "cycling",
        },
        departure_time: "2022-02-20T14:00:00.000Z",
      },
    ],
  });

  return toGoogleMapsPolygon(res.data.results);
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
