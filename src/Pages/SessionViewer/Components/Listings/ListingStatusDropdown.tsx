import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { ListingStatusType } from "../../../../API";
import { getListingStatusName } from "../../../../Utils/utils";

export default function ListingStatusDropdown({
  selected,
  onChange,
  multiple = false,
}: Props) {
  const formattedSelected = React.useMemo(() => {
    return selected.map((s) => ({ value: s, label: getListingStatusName(s) }));
  }, [selected]);

  const options = React.useMemo(() => {
    return [
      ListingStatusType.NEW,
      ListingStatusType.AWAITING_REPLY,
      ListingStatusType.IN_CONTACT,
      ListingStatusType.TOURED,
      ListingStatusType.APPLIED,
      ListingStatusType.ACCEPTED,
      ListingStatusType.REJECTED,
    ].map((s) => ({ value: s, label: getListingStatusName(s) }));
  }, []);

  // if single select, show all options all the time
  const filterBy = multiple ? undefined : () => true;

  return (
    <Typeahead
      options={options}
      selected={formattedSelected}
      multiple={multiple}
      filterBy={filterBy}
      onChange={(selected) => {
        onChange(selected.map((option) => option.value));
      }}
    />
  );
}

interface Props {
  selected: ListingStatusType[];
  multiple?: boolean;
  onChange: (selected: ListingStatusType[]) => void;
}
