import React from "react";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { ListingContext } from "../../../../Contexts/ListingContext";
import { SearchType } from "../../../../API/Google Places";
import AddressSearchBar from "../../../../Components/AddressSearchBar";
import {
  Coordinate,
  geocodeByAddress,
} from "../../../../API/Google Places/Geocoding";
import { useUpdateSession } from "../../../../Utils/Hooks";
import SessionData, { Listing } from "../../../../Models/Session";
import { Typeahead } from "react-bootstrap-typeahead";
import { ListingStatusType } from "../../../../API";

export default function EditListingDialog({
  onClose,
  session,
  listing,
}: IProps) {
  const { setSelectedListing } = React.useContext(ListingContext);

  const updateSessionMutation = useUpdateSession();

  const [formData, setFormData] = React.useState<EditListingFormData>({
    ...listing,
  });
  const [formDataErrors, setFormDataErrors] =
    React.useState<FormDataErrors>(DEFAULT_DATA_ERRORS);

  async function handleSaveClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(formData);
    setFormDataErrors(errors);
    if (hasErrors(errors)) return;

    const updatedListing: Listing = {
      id: listing.id,
      name: formData.name!,
      address: formData.address!,
      location: formData.location!,
      price: formData.price!,
      numberOfBedrooms: formData.numberOfBedrooms!,
      numberOfBathrooms: formData.numberOfBathrooms!,
      link: formData.link,
      status: formData.status,
    };
    const updatedListings = (session.listings ?? []).map((l) => {
      if (l.id === listing.id) return updatedListing;
      return l;
    });

    try {
      await updateSessionMutation.mutateAsync({
        ...session,
        listings: updatedListings,
      });
      setSelectedListing(updatedListing);
      onClose();
    } catch (e) {
      console.error("Failed to update listing", e);
      toast.error("Failed to update listing");
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
      setFormData((prev) => ({
        ...prev,
        address,
      }));
      const addressGeocodingInfo = await geocodeByAddress(address);
      // there is guaranteed to be one result
      const addressInfo = addressGeocodingInfo[0];
      setFormData((prev) => ({
        ...prev,
        location: addressInfo.location,
      }));
    } catch (err) {
      // TODO: show toast and maybe clear the search?
      console.error("Failed to load location information", err);
      toast.error("Failed to load location information");
      setFormData((prev) => ({
        ...prev,
        address: undefined,
        location: undefined,
      }));
    }
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Listing</Modal.Title>
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
              defaultInputValue={formData.address}
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
          </Form.Group>
          <Form.Group controlId="listingForm.Status">
            <Form.Label>Status</Form.Label>
            <Typeahead
              options={[
                ListingStatusType.NEW,
                ListingStatusType.AWAITING_REPLY,
                ListingStatusType.IN_CONTACT,
                ListingStatusType.TOURED,
                ListingStatusType.APPLIED,
                ListingStatusType.ACCEPTED,
                ListingStatusType.REJECTED,
              ]}
              selected={formData.status ? [formData.status] : []}
              filterBy={() => true}
              onChange={(selected) => {
                const status =
                  selected.length > 0 ? selected[0] : ListingStatusType.NEW; // Default to new
                setFormData((prev) => ({
                  ...prev,
                  status,
                }));
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface IProps {
  onClose: () => void;
  listing: Listing;
  session: SessionData;
}

interface EditListingFormData {
  name?: string;
  address?: string;
  location?: Coordinate;
  price?: number;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  link?: string | null;
  status?: ListingStatusType | null;
}

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

function validateFormData(formData: EditListingFormData): FormDataErrors {
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
