import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { PublicClientApplication, EventType } from "@azure/msal-browser";

const pca = new PublicClientApplication({
  auth: {
    clientId: "51a78271-4b04-4b15-ba49-37e01fab7a49",
    authority:
      "https://login.microsoftonline.com/d06d8a30-1a42-4daf-8cae-0a642bcf73c7",
    // login.microsoft.com is what were authenticating against- the global azure instance. d06d8a30-1a42-4daf-8cae-0a642bcf73c7 is the tenant id
    redirectUri: "/",
  },
  cache: {
    // setting this to local storage instead of session storage to persist inbeween browser refreshes
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    //   loggerOptions: {
    //     loggerCallback: (level, message, containsPII) => {
    //       console.log(message);
    //     },
    //     logLevel: "Info",
    //   },
  },
});

pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    console.log(event);
    pca.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App msalInstance={pca} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
