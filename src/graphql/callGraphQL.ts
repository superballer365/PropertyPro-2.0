import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";

async function callGraphQL<T>(
  query: any,
  variables?: object
): Promise<GraphQLResult<T>> {
  try {
    const resp = (await API.graphql({
      ...graphqlOperation(query),
      variables,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<T>;

    // check for errors on response
    if (resp.errors && resp.errors.length > 0) throw resp.errors[0];

    return resp;
  } catch (e) {
    if (e instanceof Error) throw e;

    // for some reason, API.graphql will throw the whole response object as an error
    // if something goes wrong, so try to pull the first error from the response and rethrow it
    if (e.errors && Array.isArray(e.errors) && e.errors.length > 0)
      throw e.errors[0];

    // We don't know what this is, so just throw a generic error
    throw new Error("Failed to make graphQL request");
  }
}

export default callGraphQL;
