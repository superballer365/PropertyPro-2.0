import { getListingInfo } from "../../graphql/queries";
import { GetListingInfoResponse, GetListingInfoQuery } from "../../API";
import callGraphQL from "../../graphql/callGraphQL";

export async function crawlLink(
  listingUrl: string
): Promise<Omit<GetListingInfoResponse, "__typename">> {
  const res = await callGraphQL<GetListingInfoQuery>(getListingInfo, {
    listingUrl,
  });

  return res.data?.getListingInfo ?? {};
}
