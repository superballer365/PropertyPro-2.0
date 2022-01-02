const directionsService = new google.maps.DirectionsService();

export async function getDirections(
  request: google.maps.DirectionsRequest
): Promise<google.maps.DirectionsResult> {
  return new Promise((resolve, reject) => {
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) resolve(result);
      reject("Failed to get directions with status " + status);
    });
  });
}
