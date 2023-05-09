export function getAddressComponents(addressString: string) {
  const components = addressString.split(", ");
  return { street: components[0], city: components[1], state: components[2] };
}

export function getStreetViewUrlFromAddress(
  address: string,
  size: { height: number; width: number } = { height: 400, width: 300 }
) {
  return `https://maps.googleapis.com/maps/api/streetview?size=${size.height}x${size.width}&location=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
}
