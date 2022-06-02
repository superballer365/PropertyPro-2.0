import React from "react";
import { ListingStatusType } from "../../../../API";
import Badge from "react-bootstrap/Badge";
import { getListingStatusName } from "../../../../Utils/utils";

export default function ListingStatusBadge({ status, onClick }: Props) {
  return (
    <Badge
      style={{
        display: "flex",
        alignItems: "center",
        color: "white",
        backgroundColor: getColor(status),
        width: "min-content",
      }}
      pill
      onClick={onClick}
    >
      {status ? getListingStatusName(status) : "No status"}
    </Badge>
  );
}

interface Props {
  status: ListingStatusType | null | undefined;
  onClick?: () => void;
}

function getColor(status: ListingStatusType | null | undefined) {
  switch (status) {
    case ListingStatusType.NEW:
      return "blue";
    case ListingStatusType.ACCEPTED:
      return "green";
    case ListingStatusType.REJECTED:
      return "red";
    case null:
    case undefined:
      return "gray";
    default:
      return "purple";
  }
}
