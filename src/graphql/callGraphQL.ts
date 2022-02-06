import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

// TODO: figure out a better way to pass arguments to a query.
// We shouldn't have to keep adding properties to this interface.
export interface GraphQLOptions {
  input?: object;
  variables?: object;
  id?: string;
  authMode?: GRAPHQL_AUTH_MODE;
}

async function callGraphQL<T>(
  query: any,
  options?: GraphQLOptions
): Promise<GraphQLResult<T>> {
  try {
    const resp = (await API.graphql({
      ...graphqlOperation(query, options),
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
