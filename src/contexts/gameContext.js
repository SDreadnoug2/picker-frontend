import React from "react";

const gameContext = React.createContext({
    libraryGame: null,
    steamGame: null,
});

export default gameContext;