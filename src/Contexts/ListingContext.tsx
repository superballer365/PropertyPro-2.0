import React from "react";
import { Listing } from "../Models/Session";

interface ListingContextState {
  hoveredListingIds: string[];
  addHoveredListingId: (id: string) => void;
  removeHoveredListingId: (id: string) => void;
}

const DEFAULT_LISTING_CONTEXT_STATE: ListingContextState = {
  hoveredListingIds: [],
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

  return (
    <ListingContext.Provider
      value={{
        hoveredListingIds,
        addHoveredListingId,
        removeHoveredListingId,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
}
