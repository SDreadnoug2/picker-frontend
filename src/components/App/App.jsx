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
import LibrarySelectionContext from "../../contexts/LibrarySelectionContext";
import { getRandomSteamGame, login } from "../../utils/api";
import Cookies from "js-cookie";
import { UserDataContext } from "../../contexts/userDataContext";
import { LoggedInContext } from "../../contexts/LoggedInContext";
function App() {
  const [librarySelection, setLibrarySelection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [libraryGame, setLibraryGame] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storeGame, setStoreGame] = useState({});
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const pageVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  let userDataCookie = Cookies.get('userData');
  useEffect(() => {
    if(!userDataCookie){
      setIsLoggedIn(false);
    } else {
      setUserData(JSON.parse(userDataCookie));
      setIsLoggedIn(true);
    }
  },[userDataCookie]);

  const handleUserLogIn = () => {
      login();
      if(userDataCookie){
        setIsLoggedIn(true);
      }
  }

  const handleUserLogOut = () => {
    Cookies.remove('userData');
    console.log("bva")
    setIsLoggedIn(false);
  }

  const handleLibrarySearch = () => {
    setIsLoading(true);
    let game = null;
    try{
      //game = await 
    } catch (error) {
      console.error("Issue fetching library game:", error);
    } finally {
      setLibraryGame({
        title: game?.name || "Unknown Title",
        images: game?.screenshots?.map(image => image.path_thumbnail)|| [],
        description: game?.short_description,
        weblink: `https://store.steampowered.com/app/${game?.steam_appid}`
      });
    }
  };

  const handleStoreSearch = async () => {
    setIsLoading(true);
    let game = null;
    try{
      game = await getRandomSteamGame()
  } catch (error) {
      console.error("Issue setting store game.", error);
  } finally {
      console.log(game);
      setStoreGame({
        title: game?.name || "Unknown Title",
        images: game?.screenshots?.map(image => image.path_thumbnail)|| [],
        price: game?.price_overview?.final_formatted || "Unknown Price",
        description: game?.short_description,
        weblink: `https://store.steampowered.com/app/${game?.steam_appid}`
      })
      setIsLoading(false);
    }
    console.log(storeGame.title, storeGame.price);
  };

  console.log(isLoggedIn);

  return (
    <LoggedInContext.Provider value = {{isLoggedIn, setIsLoggedIn, logIn: handleUserLogIn, logOut: handleUserLogOut}}>
      <UserDataContext.Provider value={userData}>
        <LibrarySelectionContext.Provider
          value={{ librarySelection, setLibrarySelection }}
        >
          <div className="app">
            <Header navigate={navigate}/>
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
                        gameInfo={storeGame}
                        isLoading={isLoading}
                      />
                    }
                  ></Route>
                  <Route
                    path="userlibrary"
                    element={
                      <GameFinder isLoading={isLoading} search={handleLibrarySearch} gameInfo={libraryGame} />
                    }
                  ></Route>
                </Route>
              </Routes>
            </AnimatePresence>
          </div>
        </LibrarySelectionContext.Provider>
      </UserDataContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;
