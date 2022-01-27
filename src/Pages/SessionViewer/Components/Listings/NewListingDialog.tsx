import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { SearchType } from "../../../../API/Google Places";
import AddressSearchBar from "../../../../Components/AddressSearchBar";
import {
  Coordinate,
  geocodeByAddress,
} from "../../../../API/Google Places/Geocoding";
import { uuid } from "uuidv4";
import { useUpdateSession } from "../../../../Utils/Hooks";
import { SessionContext } from "../../../../Contexts/SessionContext";
import { Listing } from "../../../../Models/Session";
import { crawlLink } from "../../../../Utils/Crawlers/common";

export default function NewListingDialog({ onClose }: IProps) {
  const { session } = React.useContext(SessionContext);
  const updateSessionMutation = useUpdateSession();

  const [formData, setFormData] =
    React.useState<CreateListingFormData>(DEFAULT_FORM_DATA);
  const [formDataErrors, setFormDataErrors] =
    React.useState<FormDataErrors>(DEFAULT_DATA_ERRORS);

  async function handleCreateClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(formData);
    setFormDataErrors(errors);
    if (!hasErrors(errors)) {
      const newListing: Listing = {
        id: uuid(),
        name: formData.name!,
        address: formData.address!,
        location: formData.location!,
        price: formData.price!,
        numberOfBedrooms: formData.numberOfBedrooms!,
        numberOfBathrooms: formData.numberOfBathrooms!,
        link: formData.link,
        pictures: formData.pictures,
      };
      await updateSessionMutation.mutateAsync({
        ...session,
        listings: (session.listings ?? []).concat(newListing),
      });
      onClose();
    }
  }

  async function handleAddressSelect(address: string | undefined) {
    if (!address) {
      setFormData((prev) => ({
        ...prev,
        address: undefined,
        location: undefined,
      }));
      return;
    }

    try {
      const addressGeocodingInfo = await geocodeByAddress(address);
      // there is guaranteed to be one result
      const addressInfo = addressGeocodingInfo[0];
      console.log(addressInfo);
      setFormData((prev) => ({
        ...prev,
        address: address,
        location: addressInfo.location,
      }));
    } catch (err) {
      // TODO: show toast and maybe clear the search?
      console.error("Failed to load location information.");
    }
  }

  const handleFetchPicsClick = async () => {
    if (!formData.link) return;

    const pictures = await crawlLink(formData.link);
    setFormData((prev) => ({ ...prev, pictures }));
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="listingForm.Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="listing name"
              value={formData.name ?? ""}
              onChange={(event: any) =>
                setFormData((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              isInvalid={!!formDataErrors.nameError}
            />
            <Form.Control.Feedback type="invalid">
              {formDataErrors.nameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="listingForm.Address">
            <Form.Label>Address</Form.Label>
            <AddressSearchBar
              onSelect={handleAddressSelect}
              isInvalid={!!formDataErrors.addressError}
              searchType={SearchType.Address}
              selected={formData.address}
            />
            <Form.Control.Feedback type="invalid">
              {formDataErrors.nameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="listingForm.Price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={formData.price ?? ""}
              onChange={(event: any) =>
                setFormData((prev) => ({
                  ...prev,
                  price: event.target.value,
                }))
              }
              isInvalid={!!formDataErrors.priceError}
            />
            <Form.Control.Feedback type="invalid">
              {formDataErrors.priceError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="listingForm.bedrooms">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control
                type="number"
                value={formData.numberOfBedrooms ?? ""}
                onChange={(event: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    numberOfBedrooms: event.target.value,
                  }))
                }
                isInvalid={!!formDataErrors.numberOfBedroomsError}
              />
              <Form.Control.Feedback type="invalid">
                {formDataErrors.numberOfBedroomsError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="listingForm.bathrooms">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                type="number"
                value={formData.numberOfBathrooms ?? ""}
                onChange={(event: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    numberOfBathrooms: event.target.value,
                  }))
                }
                isInvalid={!!formDataErrors.numberOfBathroomsError}
              />
              <Form.Control.Feedback type="invalid">
                {formDataErrors.numberOfBathroomsError}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="listingForm.Link">
            <Form.Label>Link</Form.Label>
            <Form.Control
              type="listing link"
              value={formData.link ?? ""}
              onChange={(event: any) =>
                setFormData((prev) => ({
                  ...prev,
                  link: event.target.value,
                }))
              }
            />
            <Button onClick={handleFetchPicsClick}>Fetch Picz</Button>
            <div>{`${formData.pictures.length} pictures`}</div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface IProps {
  onClose: () => void;
}

interface CreateListingFormData {
  name?: string;
  address?: string;
  location?: Coordinate;
  price?: number;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  link?: string;
  pictures: string[];
}

const DEFAULT_FORM_DATA: CreateListingFormData = {
  name: undefined,
  address: undefined,
  location: undefined,
  price: undefined,
  numberOfBedrooms: undefined,
  numberOfBathrooms: undefined,
  link: undefined,
  pictures: [],
};

interface FormDataErrors {
  nameError?: string;
  addressError?: string;
  locationError?: string;
  priceError?: string;
  numberOfBedroomsError?: string;
  numberOfBathroomsError?: string;
}

const DEFAULT_DATA_ERRORS: FormDataErrors = {
  nameError: undefined,
  addressError: undefined,
  locationError: undefined,
  priceError: undefined,
  numberOfBedroomsError: undefined,
  numberOfBathroomsError: undefined,
};

function validateFormData(formData: CreateListingFormData): FormDataErrors {
  let nameError,
    addressError,
    locationError,
    priceError,
    numberOfBedroomsError,
    numberOfBathroomsError;

  if (!formData.name) {
    nameError = "Must provide name for listing";
  }
  if (!formData.address) {
    addressError = "Must enter an address";
  }
  if (!formData.location) {
    locationError = "Could not find address for location";
  }

  if (!formData.price) {
    priceError = "Must provide a price for the listing";
  }

  if (!formData.numberOfBedrooms) {
    numberOfBedroomsError = "Must provide a number of bedrooms";
  }

  if (!formData.numberOfBathrooms) {
    numberOfBathroomsError = "Must provide a number of bathrooms";
  }

  return {
    nameError,
    addressError,
    locationError,
    priceError,
    numberOfBedroomsError,
    numberOfBathroomsError,
  };
}

function hasErrors(formDataError: FormDataErrors) {
  let errorFound = false;

  let key: keyof typeof formDataError;
  for (key in formDataError) {
    if (!!formDataError[key]) errorFound = true;
  }

  return errorFound;
}
