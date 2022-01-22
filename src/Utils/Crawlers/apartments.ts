import { getListingPictures } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export async function crawlApartments(linkUrl: string): Promise<string[]> {
  // TODO: cleanup types and stuff
  const response = (await API.graphql(
    graphqlOperation(getListingPictures, { linkUrl })
  )) as any;
  return response.data?.getListingPictures ?? [];
}
