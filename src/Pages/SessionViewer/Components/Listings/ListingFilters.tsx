import React from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";

export default function ListingFilters() {
  const [beds, setBeds] = React.useState<number>();
  const [baths, setBaths] = React.useState<number>();
  const [maxPrice, setMaxPrice] = React.useState<number>();
  const [minPrice, setMinPrice] = React.useState<number>();

  const handleClearClick = () => {
    setBeds(undefined);
    setBaths(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
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
            type="number"
            value={beds === undefined ? "" : beds}
            onChange={(e) => setBeds(getNumericVal(e.target.value))}
          />
        </InputGroup>
        <InputGroup className="ml-1">
          <InputGroup.Prepend>
            <InputGroup.Text>Baths</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="number"
            value={baths === undefined ? "" : baths}
            onChange={(e) => setBaths(getNumericVal(e.target.value))}
          />
        </InputGroup>
      </div>
      <div className="d-flex mt-2">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Min $</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="number"
            value={minPrice === undefined ? "" : minPrice}
            onChange={(e) => setMinPrice(getNumericVal(e.target.value))}
          />
        </InputGroup>
        <InputGroup className="ml-1">
          <InputGroup.Prepend>
            <InputGroup.Text>Max $</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="number"
            value={maxPrice === undefined ? "" : maxPrice}
            onChange={(e) => setMaxPrice(getNumericVal(e.target.value))}
          />
        </InputGroup>
      </div>
      <div className="d-flex mt-2 justify-content-end">
        <Button>Apply</Button>
        <Button className="ml-1" onClick={handleClearClick}>
          Clear
        </Button>
      </div>
    </div>
  );
}
