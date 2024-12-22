//CSS
import "./App.css";
//MODULES
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
//COMPONENTS
import Cookies from "js-cookie";
import Main from "../Main/Main";
import Header from "../Header/Header";
import About from "../About/About";
import Libraries from "../Libraries/Libraries";
import GameFinder from "../GameFinder/GameFinder";
//CONTEXTS
import LibrarySelectionContext from "../../contexts/LibrarySelectionContext";
import { UserDataContext } from "../../contexts/userDataContext";
import { LoggedInContext } from "../../contexts/LoggedInContext";
import isLoadingContext from "../../contexts/isLoadingContext";
import  gameContext  from "../../contexts/gameContext";
//API FUNCTIONS
import { getRandomSteamGame, getRandomUserGame, login } from "../../utils/api";

function App() {
  //variables / states
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

//Login and User data
  //SteamID as cookie check/fetch
  let userDataCookie = Cookies.get('userData');
  useEffect(() => {
    if(!userDataCookie){
      setIsLoggedIn(false);
    } else {
      setUserData(JSON.parse(userDataCookie));
      setIsLoggedIn(true);
    }
  },[userDataCookie]);
  //User Login
  const handleUserLogIn = () => {
      login();
      if(userDataCookie){
        setIsLoggedIn(true);
      }
  }
  //User LogOut
  const handleUserLogOut = () => {
    Cookies.remove('userData');
    setIsLoggedIn(false);
  }

//Library and Steam Search Functionality
  //Format's user's playtime to hour / minutes.
  function formatPlayTime (time) {
    let message;
    if(time === 0){
      message = 'Total Playtime: Never even opened it!'
    }
    if(time > 60) {
      let hours = Math.floor(time / 60);
      message = `Total Playtime: ${hours} hours`;

    } if(time > 0 && time < 60) {
      message =  `Total Playtime: ${time} minutes`;
    }
    return message;
  }
      
  //Search user's library.
  const handleLibrarySearch = async () => {
    setIsLoading(true);
    let game = null;
    try{
      game = await getRandomUserGame(userData.steamID)
      const formattedPlayTime = formatPlayTime(game?.playTime);
      setLibraryGame({
        title: game?.name || "Unknown Title",
        images: game?.screenshots?.map(image => image.path_thumbnail)|| [],
        description: game?.short_description,
        playTime: formattedPlayTime,
        weblink: `https://store.steampowered.com/app/${game?.steam_appid}`
      });
    } catch (error) {
      console.error("Issue fetching library game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Search Steam Store
  const handleStoreSearch = async () => {
    setIsLoading(true);
    let game = null;
    try{
      game = await getRandomSteamGame()
  } catch (error) {
      console.error("Issue setting store game.", error);
  } finally {
      setStoreGame({
        title: game?.name || "Unknown Title",
        images: game?.screenshots?.map(image => image.path_thumbnail)|| [],
        price: game?.price_overview?.final_formatted || "Unknown Price",
        description: game?.short_description,
        weblink: `https://store.steampowered.com/app/${game?.steam_appid}`
      })
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(location.pathname === "/"){
      console.log("changeD");
      setLibrarySelection(null);
    }
  },[location])

//JSX Layout
  return (
    <gameContext.Provider value = {{libraryGame, storeGame}}>
      <isLoadingContext.Provider value = {{isLoading, setIsLoading}}>
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
                            className="app__main"
                          >
                            <Main navigate={navigate} />
                          </motion.div>
                        }
                      ></Route>
                      <Route path="libraries/*" element={<Libraries handleStoreSearch={handleStoreSearch} handleLibrarySearch={handleLibrarySearch}/>}>
                      </Route>
                    </Routes>
                  </AnimatePresence>
              </div>
            </LibrarySelectionContext.Provider>
          </UserDataContext.Provider>
        </LoggedInContext.Provider>
      </isLoadingContext.Provider>
    </gameContext.Provider>
  );
}

export default App;
