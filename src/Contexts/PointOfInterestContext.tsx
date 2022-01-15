import React from "react";
import { PointOfInterest } from "../Models/Session";
import useSelectedPointOfInterest from "../Utils/Hooks/useSelectedPointOfInterest";

interface PointOfInterestContextState {
  selectedPointOfInterest: PointOfInterest | undefined;
  hoveredPointOfInterestIds: string[];
  setSelectedPointOfInterest: (
    pointOfInterest: PointOfInterest | undefined,
    options?: { edit: boolean }
  ) => void;
  addHoveredPointOfInterestId: (id: string) => void;
  removeHoveredPointOfInterestId: (id: string) => void;
}

const DEFAULT_POINT_OF_INTEREST_CONTEXT_STATE: PointOfInterestContextState = {
  selectedPointOfInterest: undefined,
  hoveredPointOfInterestIds: [],
  setSelectedPointOfInterest: () => {},
  addHoveredPointOfInterestId: () => {},
  removeHoveredPointOfInterestId: () => {},
};

export const PointOfInterestContext = React.createContext(
  DEFAULT_POINT_OF_INTEREST_CONTEXT_STATE
);

export function PointOfInterestContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const { selectedPointOfInterest, setSelectedPointOfInterest } =
    useSelectedPointOfInterest();
  const [hoveredPointOfInterestIds, setHoveredPointOfInterestIds] =
    React.useState<string[]>([]);

  const addHoveredPointOfInterestId = React.useCallback((id: string) => {
    setHoveredPointOfInterestIds((prev) => prev.concat(id));
  }, []);

  const removeHoveredPointOfInterestId = React.useCallback((id: string) => {
    setHoveredPointOfInterestIds((prev) =>
      prev.filter((existingId) => existingId !== id)
    );
  }, []);

  return (
    <PointOfInterestContext.Provider
      value={{
        selectedPointOfInterest,
        hoveredPointOfInterestIds,
        setSelectedPointOfInterest,
        addHoveredPointOfInterestId,
        removeHoveredPointOfInterestId,
      }}
    >
      {children}
    </PointOfInterestContext.Provider>
  );
}
