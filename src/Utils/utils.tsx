import { ListingStatusType } from "../API";

export function getListingStatusName(status: ListingStatusType) {
  switch (status) {
    case ListingStatusType.NEW:
      return "New";
    case ListingStatusType.AWAITING_REPLY:
      return "Awaiting reply";
    case ListingStatusType.IN_CONTACT:
      return "In contact";
    case ListingStatusType.TOURED:
      return "Toured";
    case ListingStatusType.APPLIED:
      return "Applied";
    case ListingStatusType.ACCEPTED:
      return "Accepted";
    case ListingStatusType.REJECTED:
      return "Rejected";
    default:
      return undefined;
  }
}
