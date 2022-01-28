import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
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
import styles from "./ListingViewer.module.scss";
import FittedImage from "../../../../Components/FittedImage";
import ListingPicturesDialog from "./ListingPicturesDialog";

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
          <div className="mt-4">Pictures:</div>
          <Carousel className={styles.carousel}>
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

type ModalState = "None" | "Editing" | "Picutres";

interface IProps {
  listing: Listing;
}
