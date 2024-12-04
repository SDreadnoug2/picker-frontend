import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import About from "../About/About";
import Libraries from "../Libraries/Libraries";
import GameFinder from "../GameFinder/GameFinder";
import { AnimatePresence, motion } from "framer-motion";
import LibrarySelectionContext from "../../utils/LibrarySelectionContext";
import { getRandomSteamGame } from "../../utils/api";

function App() {
  const [librarySelection, setLibrarySelection] = useState(null);
  const [libraryGame, setLibraryGame] = useState({});
  const [storeGame, setStoreGame] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const pageVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const handleLibrarySearch = () => {
    /*api request for data*/
    setLibraryGame({
      /*hard coded for example usage*/
      title: "half-life 2",
      images: [
        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/220/0000001864.600x338.jpg?t=1727742736",
        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/220/header.jpg?t=1727742736",
        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/220/0000001872.600x338.jpg?t=1727742736",
      ],
      price: "$24.99",
      description: "Half Life Description",
    });
  };

  const handleStoreSearch = () => {
    const game = getRandomSteamGame()
      setStoreGame({
      title: `${game.name}`,
      images: game.screenshots,
      price: game.price_overview.final_formatted,
      description: game.about_the_game,
      weblink: `https://store.steampowered.com/app/${game.steam_appid}`
    })


  };

  return (
    <LibrarySelectionContext.Provider
      value={{ librarySelection, setLibrarySelection }}
    >
      <div className="app">
        <Header navigate={navigate} />
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route
              path="/about"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  <About />
                </motion.div>
              }
            ></Route>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Main navigate={navigate} />
                </motion.div>
              }
            ></Route>
            <Route path="libraries/*" element={<Libraries />}>
              <Route
                path="steamstore"
                element={
                  <GameFinder
                    search={handleStoreSearch}
                    gameInfo={libraryGame}
                  />
                }
              ></Route>
              <Route
                path="userlibrary"
                element={
                  <GameFinder search={handleLibrarySearch} gameInfo={storeGame} />
                }
              ></Route>
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </LibrarySelectionContext.Provider>
  );
}

export default App;
