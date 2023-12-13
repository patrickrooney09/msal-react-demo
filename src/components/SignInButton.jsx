import Button from "@mui/material/Button";

import { useMsal } from "@azure/msal-react";
// this gives use access to the application instance

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleSignIn = () => {
    instance.loginRedirect({
      scopes: ["user.read"],
    });
    // this will redirect the browser to azureId and will prompt the user to sign in
  };
  return (
    <Button color="inherit" onClick={handleSignIn}>
      Sign in
    </Button>
  );
};
