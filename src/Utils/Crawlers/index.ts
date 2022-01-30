import { API, graphqlOperation } from "aws-amplify";
import { getListingInfo } from "../../graphql/queries";
import { GetListingInfoResponse } from "../../API";

export async function crawlLink(
  listingUrl: string
): Promise<GetListingInfoResponse> {
  // TODO: cleanup types and stuff
  const response = (await API.graphql(
    graphqlOperation(getListingInfo, { listingUrl })
  )) as any;
  const data = response.data?.getListingInfo as GetListingInfoResponse;
  return data;
}
