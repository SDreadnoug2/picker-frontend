import { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import "./Libraries.css";
import { AnimatePresence, motion } from "framer-motion";
function Libraries() {
  const [library, setLibrary] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLibraryClick = (lib) => {
    setLibrary(lib);
    navigate(lib);
  };
  const outletVariants = {
    initial: { opacity: 1, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 1, x: 20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="libraries"
    >
      <div className="libraries__button-container">
        <button
          onClick={() => handleLibraryClick("userlibrary")}
          type="button"
          className={
            library === "userlibrary"
              ? "libraries__button libraries__button-selected"
              : "libraries__button"
          }
        >
          Your Library
        </button>
        <button
          onClick={() => handleLibraryClick("steamstore")}
          type="button"
          className={
            library === "steamstore"
              ? "libraries__button libraries__button-selected"
              : "libraries__button"
          }
        >
          Steam Store
        </button>
      </div>
      {library === null ? (
        <div className="libraries__empty">
          <h2 className="libraries__empty-text">Please select a library.</h2>
        </div>
      ) : (
        <div className="libraries__main">
              <Outlet />
        </div>
      )}
    </motion.div>
  );
}

export default Libraries;
