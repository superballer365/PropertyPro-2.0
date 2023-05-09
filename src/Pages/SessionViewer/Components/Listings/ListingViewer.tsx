import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faExternalLinkAlt,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Listing } from "../../../../Models/Session";
import { useUpdateSession } from "../../../../Utils/Hooks";
import EditListingDialog from "../Listings/EditListingDialog";
import {
  getAddressComponents,
  getStreetViewUrlFromAddress,
} from "../../../../Utils/address";
import { useLocation } from "react-router-dom";
import { SessionContext } from "../../../../Contexts/SessionContext";
import { ListingContext } from "../../../../Contexts/ListingContext";
import FittedImage from "../../../../Components/FittedImage";
import ListingPicturesDialog from "./ListingPicturesDialog";
import styles from "./ListingViewer.module.scss";
import ListingStatusBadge from "./ListingStatusBadge";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";

export default function ListingViewer({ listing }: IProps) {
  const { session } = React.useContext(SessionContext);
  const { setSelectedListing } = React.useContext(ListingContext);

  const [modalState, setModalState] = React.useState<ModalState>("None");

  const updateSessionMutation = useUpdateSession();

  const locationState = useLocation().state as { edit: boolean } | null;

  // update editing state if location state changes
  React.useEffect(() => {
    if (locationState?.edit) setModalState("Editing");
  }, [locationState]);

  function handleEditClick() {
    setModalState("Editing");
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
      {modalState === "Editing" && (
        <EditListingDialog
          listing={listing}
          session={session}
          onClose={() => setModalState("None")}
        />
      )}
      {modalState === "Picutres" && (
        <ListingPicturesDialog
          pictures={listing.pictures ?? []}
          onClose={() => setModalState("None")}
        />
      )}
      <Card className="h-100">
        <Card.Header className="d-flex align-items-center">
          <Button
            className="mr-2"
            size="sm"
            variant="light"
            onClick={() => setSelectedListing(undefined)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <span className="flex-grow-1">{listing.name}</span>
          <ButtonGroup>
            {listing.link && (
              <Button size="sm" href={listing.link} target="_blank">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </Button>
            )}
            <Button size="sm" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button size="sm" variant="danger" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </ButtonGroup>
        </Card.Header>
        <Card.Body className="overflow-auto">
          <Carousel
            className={styles.carousel}
            key={listing.id}
            indicators={(listing.pictures?.length ?? 0) > 0}
            controls={(listing.pictures?.length ?? 0) > 0}
          >
            <Carousel.Item key="streetView" style={{ height: 300 }}>
              <FittedImage
                className={styles.image}
                src={getStreetViewUrlFromAddress(listing.address)}
              />
            </Carousel.Item>
            {listing.pictures?.map((picture) => (
              <Carousel.Item key={picture} style={{ height: 300 }}>
                <FittedImage
                  className={styles.image}
                  src={picture}
                  onClick={() => setModalState("Picutres")}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="mt-3">
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
              <Col className="col-sm-5">Square Feet:</Col>
              <Col>{listing.squareFootage}</Col>
            </Row>
            <Row>
              <Col className="col-sm-5">Street:</Col>
              <Col>{getAddressComponents(listing.address).street}</Col>
            </Row>
            <Row>
              <Col className="col-sm-5">City:</Col>
              <Col>{getAddressComponents(listing.address).city}</Col>
            </Row>
            <Row>
              <Col className="col-sm-5">State:</Col>
              <Col>{getAddressComponents(listing.address).state}</Col>
            </Row>
            <Row>
              <Col className="col-sm-5">Status:</Col>
              <Col>
                <ListingStatusBadge status={listing.status} />
              </Col>
            </Row>
            {listing.notes && (
              <Form.Group>
                <Form.Label>Notes:</Form.Label>
                <Form.Control
                  value={listing.notes}
                  as="textarea"
                  rows={4}
                  disabled
                />
              </Form.Group>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

type ModalState = "None" | "Editing" | "Picutres";

interface IProps {
  listing: Listing;
}
