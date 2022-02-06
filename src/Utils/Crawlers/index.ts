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

  if (response.errors && response.errors.length > 0) throw response.errors[0];

  const data = response.data?.getListingInfo as GetListingInfoResponse;
  return data;
}
