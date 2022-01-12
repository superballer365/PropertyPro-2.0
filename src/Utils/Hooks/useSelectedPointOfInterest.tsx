import React from "react";
import { PointOfInterest } from "../../Models/Session";
import { useMatch, useNavigate } from "react-router-dom";
import { SessionContext } from "../../Contexts/SessionContext";

export default function useSelectedPointOfInterest() {
  const { session } = React.useContext(SessionContext);

  const match = useMatch<
    { sessionId: string; pointOfInterestId: string },
    string
  >("/Session/:sessionId/POI/:pointOfInterestId");
  const navigate = useNavigate();

  const selectedPointOfInterest = React.useMemo(() => {
    if (!match) return undefined;

    const { pointOfInterestId } = match.params as any;
    if (!match) return undefined;

    return session.pointsOfInterest?.find((p) => p.id === pointOfInterestId);
  }, [match, session]);

  const setSelectedPointOfInterest = React.useCallback(
    (
      pointOfInterest: PointOfInterest | undefined,
      options?: { edit?: boolean }
    ) => {
      let url = `/Session/${session.id}/POI`;
      url = pointOfInterest ? url + `/${pointOfInterest?.id}` : url;
      navigate(url, { state: options });
    },
    [session]
  );

  return { selectedPointOfInterest, setSelectedPointOfInterest };
}
