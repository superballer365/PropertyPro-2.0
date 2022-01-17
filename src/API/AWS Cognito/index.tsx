import AWS from "aws-sdk";
import { ICredentials } from "@aws-amplify/core";

const cognitoIdentiityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  region: "us-east-1",
});

export function getUserByEmail(
  email: string,
  credentials: ICredentials,
  userPoolId: string = process.env.REACT_APP_COGNITO_USER_POOL_ID!
) {
  cognitoIdentiityServiceProvider.config.credentials = credentials;
  return new Promise((resolve, reject) => {
    cognitoIdentiityServiceProvider.listUsers(
      {
        UserPoolId: userPoolId,
        AttributesToGet: ["email"],
        Filter: `"email"=\"${email}\"`,
      },
      (err, data) => {
        if (err) reject("Failed to get user by email: " + err);
        const user =
          data.Users && data.Users.length > 0 ? data.Users[0] : undefined;
        resolve(user);
      }
    );
  });
}

export function listUsers(
  userPoolId: string,
  attributesToGet: string[],
  credentials: ICredentials,
  filter?: string
) {
  cognitoIdentiityServiceProvider.config.credentials = credentials;
  return new Promise((resolve, reject) => {
    cognitoIdentiityServiceProvider.listUsers(
      {
        UserPoolId: userPoolId,
        AttributesToGet: attributesToGet,
        Filter: filter,
      },
      (err, data) => {
        if (err) reject("Failed to list users with error: " + err);
        resolve(data.Users ?? []);
      }
    );
  });
}
