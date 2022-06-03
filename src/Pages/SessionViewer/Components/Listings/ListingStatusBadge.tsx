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
      return "#08cad1";
    case ListingStatusType.ACCEPTED:
      return "#42d6a4";
    case ListingStatusType.REJECTED:
      return "#ff6961";
    case ListingStatusType.APPLIED:
      return "#c780e8";
    case ListingStatusType.AWAITING_REPLY:
      return "#9d94ff";
    case ListingStatusType.IN_CONTACT:
      return "#59adf6";
    case ListingStatusType.TOURED:
      return "#ffb480";
    case null:
    case undefined:
      return "gray";
  }
}
