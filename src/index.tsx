import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Initialize from "./Initialize";
import AuthorizationContextProvider from "./Contexts/AuthorizationContext";
import LayoutContextProvider from "./Contexts/LayoutContext";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

Initialize();

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <AuthorizationContextProvider>
      <LayoutContextProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer position="top-center" pauseOnFocusLoss={false} />
          <div className="mainContainer">
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </QueryClientProvider>
      </LayoutContextProvider>
    </AuthorizationContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
