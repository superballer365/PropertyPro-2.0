import React from "react";
import { Listing } from "../Models/Session";
import { SessionContext } from "./SessionContext";
import useSelectedListing from "../Utils/Hooks/useSelectedListing";

export interface ListingFilterSettings {
  beds: number | undefined;
  baths: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

const DEFAULT_LISTING_FILTER_SETTINGS: ListingFilterSettings = {
  beds: undefined,
  baths: undefined,
  minPrice: undefined,
  maxPrice: undefined,
};

interface ListingContextState {
  selectedListing: Listing | undefined;
  hoveredListingIds: string[];
  filteredListings: Listing[];
  filterSettings: ListingFilterSettings;
  setSelectedListing: (
    listing: Listing | undefined,
    options?: { edit: boolean }
  ) => void;
  setFilterSettings: (filterSettings: ListingFilterSettings) => void;
  addHoveredListingId: (id: string) => void;
  removeHoveredListingId: (id: string) => void;
}

const DEFAULT_LISTING_CONTEXT_STATE: ListingContextState = {
  selectedListing: undefined,
  hoveredListingIds: [],
  filteredListings: [],
  filterSettings: DEFAULT_LISTING_FILTER_SETTINGS,
  setSelectedListing: () => {},
  setFilterSettings: () => {},
  addHoveredListingId: () => {},
  removeHoveredListingId: () => {},
};

export const ListingContext = React.createContext(
  DEFAULT_LISTING_CONTEXT_STATE
);

export function ListingContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const { session } = React.useContext(SessionContext);

  const { selectedListing, setSelectedListing } = useSelectedListing();

  const [filterSettings, setFilterSettings] =
    React.useState<ListingFilterSettings>(DEFAULT_LISTING_FILTER_SETTINGS);
  const [hoveredListingIds, setHoveredListingIds] = React.useState<string[]>(
    []
  );

  const addHoveredListingId = React.useCallback((id: string) => {
    setHoveredListingIds((prev) => prev.concat(id));
  }, []);

  const removeHoveredListingId = React.useCallback((id: string) => {
    setHoveredListingIds((prev) =>
      prev.filter((existingId) => existingId !== id)
    );
  }, []);

  const filteredListings = React.useMemo(() => {
    const { beds, baths, minPrice, maxPrice } = filterSettings;
    return (
      session.listings?.filter((listing) => {
        const bedsMatch =
          beds === undefined ? true : listing.numberOfBedrooms === beds;
        const bathsMatch =
          baths === undefined ? true : listing.numberOfBathrooms === baths;
        const minPriceMatch =
          minPrice === undefined ? true : listing.price >= minPrice;
        const maxPriceMatch =
          maxPrice === undefined ? true : listing.price <= maxPrice;

        return bedsMatch && bathsMatch && minPriceMatch && maxPriceMatch;
      }) ?? []
    );
  }, [session, filterSettings]);

  return (
    <ListingContext.Provider
      value={{
        selectedListing,
        hoveredListingIds,
        filteredListings,
        filterSettings,
        setSelectedListing,
        setFilterSettings,
        addHoveredListingId,
        removeHoveredListingId,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}
