import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import SessionViewerDashboard from "./Components/SessionViewerDashboard";
import SessionData from "../../Models/Session";
import { useSession } from "../../Utils/Hooks";
import ErrorPage from "../Error/ErrorPage";

export default function SessionViewerPage() {
  let { sessionId } = useParams<string>() as { sessionId: string };

  const {
    isLoading: loadingSessions,
    isError,
    data: matchingSession,
  } = useSession(sessionId);

  const [sessionLoadError, setSessionLoadError] = React.useState(false);
  const [sessionFromRoute, setSessionFromRoute] = React.useState<SessionData>();

  // set the selected session based on the ID from the route
  React.useEffect(() => {
    if (loadingSessions) return;
    if (!sessionId) {
      setSessionLoadError(true);
      return;
    }

    if (!matchingSession) {
      setSessionLoadError(true);
    } else {
      setSessionFromRoute(matchingSession);
      setSessionLoadError(false);
    }
  }, [sessionId, loadingSessions, matchingSession]);

  if (sessionLoadError)
    return (
      <ErrorPage text="Could not find a session matching the specified id." />
    );

  if (loadingSessions || !sessionFromRoute)
    return <LoadingSpinner text="loading session..." />;

  return <SessionViewerDashboard session={sessionFromRoute} />;
}
