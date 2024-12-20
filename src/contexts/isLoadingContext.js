import React from "react";

const isLoadingContext = React.createContext({
  isLoading: null,
  setIsLoading: () => {},
});

export default isLoadingContext;
