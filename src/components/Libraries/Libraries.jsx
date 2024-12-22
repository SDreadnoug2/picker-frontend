import { useContext, useEffect,} from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import "./Libraries.css";
import { AnimatePresence, motion } from "framer-motion";
import LibrarySelectionContext from "../../contexts/LibrarySelectionContext";
import isLoadingContext from "../../contexts/isLoadingContext";
import gameContext from "../../contexts/gameContext";
import GameFinder from "../GameFinder/GameFinder";
function Libraries({handleStoreSearch, handleLibrarySearch}) {
  const {librarySelection, setLibrarySelection} = useContext(LibrarySelectionContext);
  const {isLoading} = useContext(isLoadingContext);
  const {libraryGame, storeGame} = useContext(gameContext);
  const navigate = useNavigate();
  //const location = useLocation();

  const handleLibraryClick = (lib) => {
    setLibrarySelection(lib);
    navigate(lib);
  };
  return (
    <div className="libraries">
        <button
          onClick={() => handleLibraryClick("userlibrary")}
          type="button"
          className={
            librarySelection === "userlibrary"
              ? "libraries__button libraries__button-selected"
              : "libraries__button"
          }
        >Your Library
        </button>
        <button
          onClick={() => handleLibraryClick("steamstore")}
          type="button"
          className={
            librarySelection === "steamstore"
              ? "libraries__button libraries__button-selected"
              : "libraries__button"
          }
        >Steam Store
        </button>
      {librarySelection === "userlibrary" ? (
          <GameFinder 
          className="libraries__gamefinder"
          librarySelection={librarySelection} 
          isLoading={isLoading} 
          search={handleLibrarySearch} 
          gameInfo={libraryGame} />
      ) : librarySelection === "steamstore" ? (
          <GameFinder
          className="libraries__gamefinder"
          librarySelection={librarySelection}
          search={handleStoreSearch}
          gameInfo={storeGame}
          isLoading={isLoading} />
      ) : (
        <div className="libraries__empty">
          <h2 className="libraries__empty-text">Please select a library.</h2>
        </div>
      )}
    </div>
  );
}

export default Libraries;
