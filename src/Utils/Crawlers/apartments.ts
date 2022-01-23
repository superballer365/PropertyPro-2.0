import { getListingPictures } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export async function crawlApartments(listingUrl: string): Promise<string[]> {
  // TODO: cleanup types and stuff
  const response = (await API.graphql(
    graphqlOperation(getListingPictures, { listingUrl })
  )) as any;
  return response.data?.getListingPictures ?? [];
}
