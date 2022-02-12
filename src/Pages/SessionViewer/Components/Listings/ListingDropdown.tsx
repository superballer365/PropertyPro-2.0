import React from "react";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useUpdateSession } from "../../../../Utils/Hooks";
import { SessionContext } from "../../../../Contexts/SessionContext";
import { Listing } from "../../../../Models/Session";

export default function ListingDropdown({ listing }: Props) {
  const { session } = React.useContext(SessionContext);

  const [open, setOpen] = React.useState(false);

  const updateSessionMutation = useUpdateSession();

  const handleToggleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  async function handleDeleteClick(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    handleItemClick(e);

    await updateSessionMutation.mutateAsync({
      ...session,
      listings: session.listings!.filter((l) => l.id !== listing.id),
    });
  }

  const handleItemClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <Dropdown show={open}>
      <Dropdown.Toggle
        as={CustomToggle}
        id="dropdown-custom-components"
        onClick={handleToggleClick}
      />
      <Dropdown.Menu>
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item className="text-danger" onClick={handleDeleteClick}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

interface Props {
  listing: Listing;
}

const CustomToggle = React.forwardRef<any>(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <FontAwesomeIcon color="gray" icon={faEllipsisV} size="lg" />
    {children}
  </a>
));
