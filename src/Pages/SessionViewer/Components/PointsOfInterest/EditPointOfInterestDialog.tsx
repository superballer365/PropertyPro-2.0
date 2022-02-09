import React from "react";
import { toast } from "react-toastify";
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
  geocodeByAddress,
} from "../../../../API/Google Places/Geocoding";
import { useUpdateSession } from "../../../../Utils/Hooks";
import SessionData, { PointOfInterest } from "../../../../Models/Session";
import { PointOfInterestType } from "../../../../API";
import { PointOfInterestContext } from "../../../../Contexts/PointOfInterestContext";
import { Typeahead } from "react-bootstrap-typeahead";

export default function EditPointOfInterestDialog({
  onClose,
  session,
  pointOfInterest,
}: IProps) {
  const { setSelectedPointOfInterest } = React.useContext(
    PointOfInterestContext
  );

  const updateSessionMutation = useUpdateSession();

  const [formData, setFormData] = React.useState<EditPointOfInterestFormData>({
    ...pointOfInterest,
  });
  const [formDataErrors, setFormDataErrors] =
    React.useState<FormDataErrors>(DEFAULT_DATA_ERRORS);

  async function handleSaveClick(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const errors = validateFormData(formData);
    setFormDataErrors(errors);
    if (hasErrors(errors)) return;

    const updatedPointOfInterest: PointOfInterest = {
      id: pointOfInterest.id,
      name: formData.name!,
      type: formData.type!,
      address: formData.address!,
      location: formData.location!,
    };
    const updatedPointsOfInterest = (session.pointsOfInterest ?? []).map(
      (p) => {
        if (p.id === pointOfInterest.id) return updatedPointOfInterest;
        return p;
      }
    );

    try {
      await updateSessionMutation.mutateAsync({
        ...session,
        pointsOfInterest: updatedPointsOfInterest,
      });
      setSelectedPointOfInterest(updatedPointOfInterest);
      onClose();
    } catch (e) {
      console.error("Failed to update point of interest", e);
      toast.error("Failed to update point of interest");
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
        <Modal.Title>Edit Point of Interest</Modal.Title>
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
              selected={formData.address}
            />
            <Form.Control.Feedback type="invalid">
              {formDataErrors.nameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="pointOfInterestForm.Type">
            <Form.Label>Type</Form.Label>
            <Typeahead
              selected={[
                formData.type === PointOfInterestType.WORK ? "Work" : "Other",
              ]}
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
        <Button variant="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface IProps {
  onClose: () => void;
  pointOfInterest: PointOfInterest;
  session: SessionData;
}

interface EditPointOfInterestFormData {
  name?: string;
  type?: PointOfInterestType;
  address?: string;
  location?: Coordinate;
}

const DEFAULT_FORM_DATA: EditPointOfInterestFormData = {
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
  formData: EditPointOfInterestFormData
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
