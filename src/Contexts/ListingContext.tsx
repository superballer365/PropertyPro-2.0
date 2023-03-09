import React from "react";
import { Listing } from "../Models/Session";
import { SessionContext } from "./SessionContext";
import useSelectedListing from "../Utils/Hooks/useSelectedListing";
import { ListingStatusType } from "../API";

export interface ListingFilterSettings {
  beds: number | undefined;
  baths: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  statuses: ListingStatusType[];
}

const DEFAULT_LISTING_FILTER_SETTINGS: ListingFilterSettings = {
  beds: undefined,
  baths: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  statuses: [],
};

export type ListingSortOption =
  | "None"
  | "Price (low to high)"
  | "Price (high to low)"
  | "Beds"
  | "Baths"
  | "Size";

interface ListingContextState {
  selectedListing: Listing | undefined;
  hoveredListingIds: string[];
  filteredListings: Listing[];
  filterSettings: ListingFilterSettings;
  sortOption: ListingSortOption;
  setSelectedListing: (
    listing: Listing | undefined,
    options?: { edit: boolean }
  ) => void;
  setFilterSettings: (filterSettings: ListingFilterSettings) => void;
  setSortOption: (sortOption: ListingSortOption) => void;
  addHoveredListingId: (id: string) => void;
  removeHoveredListingId: (id: string) => void;
}

const DEFAULT_LISTING_CONTEXT_STATE: ListingContextState = {
  selectedListing: undefined,
  hoveredListingIds: [],
  filteredListings: [],
  filterSettings: DEFAULT_LISTING_FILTER_SETTINGS,
  sortOption: "None",
  setSelectedListing: () => {},
  setFilterSettings: () => {},
  setSortOption: () => {},
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
  const [sortOption, setSortOption] = React.useState<ListingSortOption>("None");

  const addHoveredListingId = React.useCallback((id: string) => {
    setHoveredListingIds((prev) => prev.concat(id));
  }, []);

  const removeHoveredListingId = React.useCallback((id: string) => {
    setHoveredListingIds((prev) =>
      prev.filter((existingId) => existingId !== id)
    );
  }, []);

  const filteredListings = React.useMemo(() => {
    const { beds, baths, minPrice, maxPrice, statuses } = filterSettings;
    return (session.listings ?? [])
      .filter((listing) => {
        const bedsMatch =
          beds === undefined ? true : listing.numberOfBedrooms === beds;
        const bathsMatch =
          baths === undefined ? true : listing.numberOfBathrooms === baths;
        const minPriceMatch =
          minPrice === undefined ? true : listing.price >= minPrice;
        const maxPriceMatch =
          maxPrice === undefined ? true : listing.price <= maxPrice;
        const statusMatch =
          statuses.length > 0
            ? listing.status && statuses.includes(listing.status)
            : true;

        return (
          bedsMatch &&
          bathsMatch &&
          minPriceMatch &&
          maxPriceMatch &&
          statusMatch
        );
      })
      .sort((listingA, listingB) => {
        if (sortOption === "None") return 1;
        else if (sortOption === "Price (high to low)")
          return listingB.price - listingA.price;
        else if (sortOption === "Price (low to high)")
          return listingA.price - listingB.price;
        else if (sortOption === "Beds")
          return listingB.numberOfBedrooms - listingA.numberOfBedrooms;
        else if (sortOption === "Size")
          return (listingB.squareFootage ?? 0) - (listingA.squareFootage ?? 0);
        else return listingB.numberOfBathrooms - listingA.numberOfBathrooms;
      });
  }, [session, filterSettings, sortOption]);

  return (
    <ListingContext.Provider
      value={{
        selectedListing,
        hoveredListingIds,
        filteredListings,
        filterSettings,
        sortOption,
        setSelectedListing,
        setFilterSettings,
        setSortOption,
        addHoveredListingId,
        removeHoveredListingId,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}
