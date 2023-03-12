import React from "react";
import SessionData, { Listing } from "../../Models/Session";
import { useMatch, useNavigate } from "react-router-dom";
import { SessionContext } from "../../Contexts/SessionContext";
import { useNavigateWithFocus } from "./useLayoutElementFocus";

export default function useSelectedListing() {
  const { session } = React.useContext(SessionContext);

  const match = useMatch<{ sessionId: string; listingId: string }, string>(
    "/Session/:sessionId/Listings/:listingId"
  );
  const navigate = useNavigateWithFocus();

  const selectedListing = React.useMemo(() => {
    if (!match) return undefined;

    const { listingId } = match.params as any;
    if (!match) return undefined;

    return session.listings?.find((l) => l.id === listingId);
  }, [match, session]);

  const setSelectedListing = React.useCallback(
    (listing: Listing | undefined, options?: { edit?: boolean }) => {
      let url = `/Session/${session.id}/Listings`;
      url = listing ? url + `/${listing?.id}` : url;
      navigate(url, "sidebar", { state: options });
    },
    [session]
  );

  return { selectedListing, setSelectedListing };
}
