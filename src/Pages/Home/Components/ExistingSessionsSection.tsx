import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Card from "react-bootstrap/Card";
import SessionData from "../../../Models/Session";
import Spinner from "react-bootstrap/Spinner";
import EditSessionDialog from "./EditSessionDialog";
import { useDeleteSession, useSessions } from "../../../Utils/Hooks";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonWithTooltip } from "../../../Components/Tooltip";
import styles from "./ExistingSessionSection.module.scss";
import classNames from "classnames";

export default function ExistingSessionsSection() {
  const {
    isLoading: loadingSessions,
    isError,
    data: existingSessions,
  } = useSessions();

  const [sessionToEdit, setSessionToEdit] = React.useState<
    SessionData | undefined
  >(undefined);

  function handleEditClick(session: SessionData) {
    setSessionToEdit(session);
  }

  function getContent() {
    if (loadingSessions) return <LoadingSpinner text="Loading sessions..." />;

    if (existingSessions && existingSessions.length > 0)
      return (
        <div>
          {existingSessions?.map((session) => (
            <SessionEntry
              key={session.id}
              sessionData={session}
              onEditClick={handleEditClick}
            />
          ))}
        </div>
      );

    return <div>No existing sessions</div>;
  }

  return (
    <>
      {sessionToEdit && (
        <EditSessionDialog
          session={sessionToEdit}
          onClose={() => setSessionToEdit(undefined)}
        />
      )}
      <Card>
        <Card.Header>My Sessions</Card.Header>
        <Card.Body>{getContent()}</Card.Body>
      </Card>
    </>
  );
}

interface ISessionEntryProps {
  sessionData: SessionData;
  onEditClick: (session: SessionData) => void;
}

function SessionEntry({ sessionData, onEditClick }: ISessionEntryProps) {
  const deleteSessionMutation = useDeleteSession();

  const [deletingSession, setDeletingSession] = React.useState(false);

  const navigate = useNavigate();

  async function handleDeleteClick(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation();
    if (deletingSession) return;

    try {
      setDeletingSession(true);
      await deleteSessionMutation.mutateAsync(sessionData.id!);
    } catch (e) {
      console.error("Failed to delete session", e);
      toast.error("Failed to delete session");
    } finally {
      setDeletingSession(false);
    }
  }

  function handleEditClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
    onEditClick(sessionData);
  }

  function handleOpenClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
    navigate(`/Session/${sessionData.id!}`);
  }

  return (
    <ListGroupItem
      className={classNames(
        styles.item,
        "d-flex justify-content-between align-items-center"
      )}
      onClick={handleOpenClick}
    >
      <div>{sessionData.name}</div>
      <div>
        <ButtonWithTooltip
          tooltipText="View Map"
          elementId="viewMap"
          variant="primary"
          onClick={handleOpenClick}
        >
          <FontAwesomeIcon icon={faMapMarkedAlt} />
        </ButtonWithTooltip>{" "}
        <ButtonWithTooltip
          tooltipText="Edit Session"
          elementId="editSession"
          variant="primary"
          onClick={handleEditClick}
        >
          <FontAwesomeIcon icon={faEdit} />
        </ButtonWithTooltip>{" "}
        <ButtonWithTooltip
          tooltipText="Delete Session"
          elementId="deleteSession"
          variant="danger"
          onClick={handleDeleteClick}
        >
          {deletingSession ? (
            <Spinner animation="border" variant="primary" size="sm" />
          ) : (
            <FontAwesomeIcon icon={faTrash} />
          )}
        </ButtonWithTooltip>
      </div>
    </ListGroupItem>
  );
}
