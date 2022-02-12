import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { googlePlacesAutoComplete, SearchType } from "../API/Google Places";

interface IProps {
  onSelect: (selectedAddress: string | undefined) => void;
  defaultInputValue?: string;
  placeholder?: string;
  isInvalid: boolean;
  searchType: SearchType;
  selected: string | undefined;
}

export default function AutoCompleteSearchBar({
  onSelect,
  defaultInputValue,
  placeholder,
  isInvalid,
  searchType,
  selected,
}: IProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  async function handleSearch(searchText: string) {
    setIsLoading(true);
    const autoCompleteResult = await googlePlacesAutoComplete(
      searchText,
      searchType
    );
    setSuggestions(
      autoCompleteResult.suggestions.map((suggestion) => suggestion.name)
    );
    setIsLoading(false);
  }

  function handleSelect(selections: string[]) {
    onSelect(selections.length > 0 ? selections[0] : undefined);
  }

  return (
    <AsyncTypeahead
      className="w-100"
      id="address search typeahead"
      delay={500}
      multiple={false}
      minLength={4}
      isLoading={isLoading}
      defaultInputValue={defaultInputValue}
      placeholder={placeholder}
      onSearch={handleSearch}
      options={suggestions}
      onChange={handleSelect}
      filterBy={() => true}
      useCache={true}
      isInvalid={isInvalid}
      selected={selected ? [selected] : []}
    />
  );
}
