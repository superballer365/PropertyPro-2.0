import React from "react";
import AWS from "aws-sdk";
import Auth from "@aws-amplify/auth";

export default function RoommatesPanel() {
  const dod = async () => {
    const cred = await Auth.currentCredentials();
    const c = new AWS.CognitoIdentityServiceProvider({
      region: "us-east-1",
      credentials: Auth.essentialCredentials(cred),
    });
    c.listUsers(
      {
        UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!,
        AttributesToGet: ["email"],
      },
      (err, data) => {
        console.log("Error:" + err);
        console.log(data.Users);
      }
    );
  };

  React.useEffect(() => {
    dod();
  }, []);

  return <div>Roommates</div>;
}
