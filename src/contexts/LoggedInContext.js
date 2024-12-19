import React from "react";

const LoggedInContext = React.createContext({
  isLoggedIn: null,
  setIsLoggedIn: () => {},
  logIn: () => {},
  logOut: () => {},
});

export {LoggedInContext};
