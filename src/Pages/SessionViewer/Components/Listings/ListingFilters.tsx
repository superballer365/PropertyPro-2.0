import React from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import { ListingContext } from "../../../../Contexts/ListingContext";
import { Typeahead } from "react-bootstrap-typeahead";
import { ListingStatusType } from "../../../../API";

export default function ListingFilters() {
  const { filterSettings, setFilterSettings } =
    React.useContext(ListingContext);

  const [localFilterSettings, setLocalFilterSettings] =
    React.useState(filterSettings);

  const handleClearClick = () => {
    setLocalFilterSettings({
      beds: undefined,
      baths: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      statuses: [],
    });
    setFilterSettings({
      beds: undefined,
      baths: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      statuses: [],
    });
  };

  const handleApplyClick = () => {
    setFilterSettings(localFilterSettings);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericVal = getNumericVal(value);

    setLocalFilterSettings((prev) => ({ ...prev, [name]: numericVal }));
  };

  const getNumericVal = (newVal: string | undefined): number | undefined => {
    if (newVal == "") return undefined;

    const num = Number(newVal);
    if (num === Number.NaN) return undefined;
    return num;
  };

  return (
    <div>
      <div className="d-flex mt-2">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Beds</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="beds"
            type="number"
            value={
              localFilterSettings.beds === undefined
                ? ""
                : localFilterSettings.beds
            }
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="ml-1">
          <InputGroup.Prepend>
            <InputGroup.Text>Baths</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="baths"
            type="number"
            value={
              localFilterSettings.baths === undefined
                ? ""
                : localFilterSettings.baths
            }
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <div className="d-flex mt-2">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Min $</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="minPrice"
            type="number"
            value={
              localFilterSettings.minPrice === undefined
                ? ""
                : localFilterSettings.minPrice
            }
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="ml-1">
          <InputGroup.Prepend>
            <InputGroup.Text>Max $</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="maxPrice"
            type="number"
            value={
              localFilterSettings.maxPrice === undefined
                ? ""
                : localFilterSettings.maxPrice
            }
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <div>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Status</InputGroup.Text>
          </InputGroup.Prepend>
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
            selected={localFilterSettings.statuses}
            onChange={(statuses) =>
              setLocalFilterSettings((prev) => ({ ...prev, statuses }))
            }
            multiple={true}
          />
        </InputGroup>
      </div>
      <div className="d-flex mt-2 justify-content-end">
        <Button onClick={handleApplyClick}>Apply</Button>
        <Button className="ml-1" onClick={handleClearClick}>
          Clear
        </Button>
      </div>
    </div>
  );
}
