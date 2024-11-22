import React, { useContext } from "react";

const activeModalContext = React.createContext({
    activeModal: null,
    setActiveModal: () => {},
    closeModal: () => {},
});

export default activeModalContext;