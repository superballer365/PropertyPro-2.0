import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Listing } from "../../../../Models/Session";
import { useUpdateSession } from "../../../../Utils/Hooks";
import EditListingDialog from "../Listings/EditListingDialog";
import { getAddressComponents } from "../../../../Utils/address";
import { useLocation } from "react-router-dom";
import { SessionContext } from "../../../../Contexts/SessionContext";
import { ListingContext } from "../../../../Contexts/ListingContext";

export default function ListingViewer({ listing }: IProps) {
  const { session } = React.useContext(SessionContext);
  const { setSelectedListing } = React.useContext(ListingContext);

  const [isEditing, setIsEditing] = React.useState(false);

  const updateSessionMutation = useUpdateSession();

  const locationState = useLocation().state as { edit: boolean } | null;

  // update editing state if location state changes
  React.useEffect(() => {
    if (locationState?.edit) setIsEditing(true);
  }, [locationState]);

  async function handleEditClick() {
    setIsEditing(true);
  }

  async function handleDeleteClick() {
    await updateSessionMutation.mutateAsync({
      ...session,
      listings: session.listings!.filter((l) => l.id !== listing.id),
    });
    setSelectedListing(undefined);
  }

  return (
    <>
      {isEditing && (
        <EditListingDialog
          listing={listing}
          session={session}
          onClose={() => setIsEditing(false)}
        />
      )}
      <Card className="h-100">
        <Card.Header>
          <Button
            className="mr-2"
            size="sm"
            variant="light"
            onClick={() => setSelectedListing(undefined)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <span>{listing.name}</span>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="col-sm-5">Price:</Col>
            <Col>{"$" + listing.price}</Col>
          </Row>
          <Row>
            <Col className="col-sm-5">Bedrooms:</Col>
            <Col>{listing.numberOfBedrooms}</Col>
          </Row>
          <Row>
            <Col className="col-sm-5">Bathrooms:</Col>
            <Col>{listing.numberOfBathrooms}</Col>
          </Row>
          <Row>
            <Col className="col-sm-5">Street:</Col>
            <Col>{getAddressComponents(listing.address).street}</Col>
          </Row>
          <Row>
            <Col className="col-sm-5">State:</Col>
            <Col>{getAddressComponents(listing.address).state}</Col>
          </Row>
          <Row>
            <Col className="col-sm-5">
              {listing.link && (
                <a href={listing.link} target="_blank">
                  Link
                </a>
              )}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <Button className="mr-1" variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

interface IProps {
  listing: Listing;
}
