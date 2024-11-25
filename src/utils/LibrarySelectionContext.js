import React, { useContext } from "react";

const LibrarySelectionContext = React.createContext({
    librarySelection: null,
    setLibrarySelection: () => {},
});

export default LibrarySelectionContext;