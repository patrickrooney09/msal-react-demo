import { InteractionType } from "@azure/msal-browser";
import { ProfileData } from "../components/ProfileData";

import { useMsalAuthentication } from "@azure/msal-react";
// this gives us our access token
import { useState, useEffect } from "react";

import { fetchData } from "../fetch";

export const Profile = () => {
  const [graphData, setGraphData] = useState(null);

  const { result, error } = useMsalAuthentication(
    (InteractionType.Popup,
    {
      scopes: ["User.read"],
    })
  );
  console.log("RESULT:", result);
  console.log("ERROR:", error);

  useEffect(() => {
    if (!!graphData) {
      console.log("WHEEEEE");
      return;
    }

    if (!!error) {
      console.log("HELLO");
      console.log(error);
      return;
    }

    if (result) {
      const { accessToken } = result;

      fetchData("https://graph.microsoft.com/v1.0/me", accessToken)
        .then((response) => {
          setGraphData(response);
        })
        .catch((error) => console.log(error));
    }
  }, [graphData, error, result]);

  return <>{graphData ? <ProfileData graphData={graphData} /> : null}</>;
};
