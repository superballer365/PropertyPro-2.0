import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  AutoCompleteSuggestion,
  SearchType,
} from "../../../../API/Google Places";
import AddressSearchBar from "../../../../Components/AddressSearchBar";
import {
  Coordinate,
  geocodeByPlaceId,
} from "../../../../API/Google Places/Geocoding";
import { uuid } from "uuidv4";
import { useUpdateSession } from "../../../../Utils/Hooks";
import SessionData, { PointOfInterest } from "../../../../Models/Session";
import { PointOfInterestType } from "../../../../API";
import { Typeahead } from "react-bootstrap-typeahead";

export default function NewPointOfInterestDialog({ onClose, session }: IProps) {
  const updateSessionMutation = useUpdateSession();

  const [formData, setFormData] =
    React.useState<CreatePointOfInterestFormData>(DEFAULT_FORM_DATA);
  const [formDataErrors, setFormDataErrors] =
    React.useState<FormDataErrors>(DEFAULT_DATA_ERRORS);

  async function handleCreateClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(formData);
    setFormDataErrors(errors);
    if (!hasErrors(errors)) {
      const newPointOfInterest: PointOfInterest = {
        id: uuid(),
        name: formData.name!,
        type: formData.type!,
        address: formData.address!,
        location: formData.location!,
      };
      await updateSessionMutation.mutateAsync({
        ...session,
        pointsOfInterest: (session.pointsOfInterest ?? []).concat(
          newPointOfInterest
        ),
      });
      onClose();
    }
  }

  async function handleAddressSelect(
    address: AutoCompleteSuggestion | undefined
  ) {
    if (!address) {
      setFormData((prev) => ({
        ...prev,
        address: undefined,
        location: undefined,
      }));
      return;
    }

    try {
      const addressGeocodingInfo = await geocodeByPlaceId(address.id);
      // there is guaranteed to be one result
      const addressInfo = addressGeocodingInfo[0];
      console.log(addressInfo);
      setFormData((prev) => ({
        ...prev,
        address: addressInfo.name,
        location: addressInfo.location,
      }));
    } catch (err) {
      // TODO: show toast and maybe clear the search?
      console.error("Failed to load location information.");
    }
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Point of Interest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="pointOfInterestForm.Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="point of interest name"
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
          <Form.Group controlId="pointOfInterestForm.Address">
            <Form.Label>Address</Form.Label>
            <AddressSearchBar
              defaultInputValue={formData.address}
              onSelect={handleAddressSelect}
              isInvalid={!!formDataErrors.addressError}
              searchType={SearchType.Address}
            />
            <Form.Control.Feedback type="invalid">
              {formDataErrors.nameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="pointOfInterestForm.Type">
            <Form.Label>Type</Form.Label>
            <Typeahead
              selected={
                formData.type
                  ? [
                      formData.type === PointOfInterestType.WORK
                        ? "Work"
                        : "Other",
                    ]
                  : undefined
              }
              options={["Work", "Other"]}
              onChange={(selected) => {
                const type = selected.length > 0 ? selected[0] : undefined;
                setFormData((prev) => ({
                  ...prev,
                  type:
                    type === "Work"
                      ? PointOfInterestType.WORK
                      : PointOfInterestType.OTHER,
                }));
              }}
            />
            <Form.Control.Feedback type="invalid">
              {formDataErrors.typeError}
            </Form.Control.Feedback>
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
  session: SessionData;
}

interface CreatePointOfInterestFormData {
  name?: string;
  type?: PointOfInterestType;
  address?: string;
  location?: Coordinate;
}

const DEFAULT_FORM_DATA: CreatePointOfInterestFormData = {
  name: undefined,
  type: undefined,
  address: undefined,
  location: undefined,
};

interface FormDataErrors {
  nameError?: string;
  typeError?: string;
  addressError?: string;
  locationError?: string;
}

const DEFAULT_DATA_ERRORS: FormDataErrors = {
  nameError: undefined,
  typeError: undefined,
  addressError: undefined,
  locationError: undefined,
};

function validateFormData(
  formData: CreatePointOfInterestFormData
): FormDataErrors {
  let nameError, typeError, addressError, locationError;

  if (!formData.name) {
    nameError = "Must provide name for point of interest";
  }
  if (!formData.type) {
    nameError = "Must provide type for point of interest";
  }
  if (!formData.address) {
    addressError = "Must enter an address";
  }
  if (!formData.location) {
    locationError = "Could not find address for location";
  }

  return {
    nameError,
    typeError,
    addressError,
    locationError,
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
