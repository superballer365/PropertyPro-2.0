export function getAddressComponents(addressString: string) {
  const components = addressString.split(", ");
  return { street: components[0], city: components[1], state: components[2] };
}
