import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import awsmobile from "./aws-exports";

import Amplify from "aws-amplify";
// import Initialize from "./Initialize";
import AuthorizationContextProvider from "./Contexts/AuthorizationContext";

// TODO: add back after auth is created
// Initialize();

awsmobile.aws_appsync_authenticationType = "API_KEY";
console.log("configuration:");
console.log(awsmobile);
Amplify.configure(awsmobile);

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    {/* <AuthorizationContextProvider> */}
    <QueryClientProvider client={queryClient}>
      <div className="mainContainer">
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
    {/* </AuthorizationContextProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
