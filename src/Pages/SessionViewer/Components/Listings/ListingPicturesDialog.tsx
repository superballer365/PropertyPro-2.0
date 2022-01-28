import React from "react";
import Modal from "react-bootstrap/esm/Modal";
import FittedImage from "../../../../Components/FittedImage";

export default function ListingPicturesDialog({ pictures, onClose }: Props) {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Body>
        {pictures.length === 0 ? (
          <div>No pictures</div>
        ) : (
          pictures.map((picture) => (
            <FittedImage className="mb-1" src={picture} />
          ))
        )}
      </Modal.Body>
    </Modal>
  );
}

interface Props {
  pictures: string[];
  onClose: () => void;
}
