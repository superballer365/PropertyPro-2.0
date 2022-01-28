import { API, graphqlOperation } from "aws-amplify";
import { getListingPictures } from "../../graphql/queries";

export async function crawlLink(listingUrl: string): Promise<string[]> {
  // TODO: cleanup types and stuff
  const response = (await API.graphql(
    graphqlOperation(getListingPictures, { listingUrl })
  )) as any;
  return response.data?.getListingPictures ?? [];
}
