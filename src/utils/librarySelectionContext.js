import React, { useContext } from "react";

const librarySelectionContext = React.createContext({
    librarySelection: null,
    setLibrarySelection: () => {},
});

export default librarySelectionContext;