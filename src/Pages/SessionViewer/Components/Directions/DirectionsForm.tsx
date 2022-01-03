import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddressSearchBar from "../../../../Components/AddressSearchBar";
import { SearchType } from "../../../../API/Google Places";

export default function DirectionsForm({ onSearchClick }: IProps) {
  const [origin, setOrigin] = React.useState<string>();
  const [destination, setDestination] = React.useState<string>();

  const handleSearch = () => {
    if (!origin || !destination) return;

    onSearchClick(origin, destination, google.maps.TravelMode.DRIVING);
  };

  return (
    <Form>
      <Form.Group controlId="directionsForm.Origin">
        <Form.Label>Origin</Form.Label>
        <AddressSearchBar
          onSelect={(address) => setOrigin(address.name)}
          isInvalid={false}
          searchType={SearchType.Address}
        />
      </Form.Group>
      <Form.Group controlId="directionsForm.Destination">
        <Form.Label>Destination</Form.Label>
        <AddressSearchBar
          onSelect={(address) => setDestination(address.name)}
          isInvalid={false}
          searchType={SearchType.Address}
        />
      </Form.Group>
      <Button onClick={handleSearch}>Search</Button>
    </Form>
  );
}

interface IProps {
  onSearchClick: (
    origin: string,
    destination: string,
    mode: google.maps.TravelMode
  ) => void;
}
