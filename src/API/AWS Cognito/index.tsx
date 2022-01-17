import AWS from "aws-sdk";
import { UserType } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { ICredentials } from "@aws-amplify/core";
import { User } from "../../Models/Session";

const cognitoIdentiityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  region: "us-east-1",
});

export function getUserByEmail(
  email: string,
  credentials: ICredentials,
  userPoolId: string = process.env.REACT_APP_COGNITO_USER_POOL_ID!
): Promise<User | undefined> {
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
        resolve(user ? cognitoUserToUser(user) : undefined);
      }
    );
  });
}

export function listUsers(
  userPoolId: string,
  attributesToGet: string[],
  credentials: ICredentials,
  filter?: string
): Promise<User[]> {
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
        const users = data.Users ? data.Users.map(cognitoUserToUser) : [];
        resolve(users);
      }
    );
  });
}

const cognitoUserToUser = (cognitoUser: UserType): User => {
  const attributesDict: Record<string, string> = {};
  cognitoUser.Attributes?.forEach((attribute) => {
    if (attribute.Name && attribute.Value)
      attributesDict[attribute.Name] = attribute.Value;
  });

  return {
    userName: cognitoUser.Username!,
    email: attributesDict["email"]!,
  };
};
