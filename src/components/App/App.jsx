import './App.css'
import { useEffect, useState,} from 'react'
import {Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom'
import Main from '../Main/Main'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Preloader from '../Preloader/Preloader'
import About from '../About/About'
import Libraries from '../Libraries/Libraries'
import activeModalContext from '../../utils/activeModal'
import GameFinder from '../GameFinder/GameFinder'
import {AnimatePresence, motion} from "framer-motion";
import librarySelectionContext from '../../utils/librarySelectionContext'

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [librarySelection, setLibrarySelection] = useState(null);
  const [libraryGame, setLibraryGame] = useState({});
  const [storeGame, setStoreGame] = useState({});

  const closeModal = () => setActiveModal("");
  const navigate = useNavigate();
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const handleLibrarySearch = () =>{
      /*api request for data*/
      setLibraryGame({
          /*hard coded for example usage*/
          title: "half-life 2",
          images: [ "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/220/0000001864.600x338.jpg?t=1727742736",
              "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/220/header.jpg?t=1727742736",
              "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/220/0000001872.600x338.jpg?t=1727742736",],
          price: "$24.99",
          description: "Half Life Description",
      })
  }
  const handleStoreSearch = () =>{
      /*api request for data*/
      setStoreGame({
          /*hard coded for example usage*/
          title: "Fallout 4",
          images: [ "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/220/0000001864.600x338.jpg?t=1727742736",
              "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/220/header.jpg?t=1727742736",
              "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/220/0000001872.600x338.jpg?t=1727742736",],
          price: "$59.99",
          description: "Fallout 4 Description",
      })
  }

  return (
    <librarySelectionContext.Provider value={{librarySelection, setLibrarySelection}}>
      <activeModalContext.Provider value={{activeModal, setActiveModal, closeModal}}>
        <div className='app'>
        {activeModal === "about" && (
            <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}>
              <About closeModal={closeModal}/> 
            </motion.div>
        )}
          <Header navigate={navigate}/>
          <AnimatePresence mode="wait">
            <Routes location={location}> 
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
                }>
              </Route>
              <Route
              path="libraries/*"    
              element={<Libraries/>
              }
              >
                <Route path="steamstore" element={<GameFinder search={() => handleLibrarySearch} gameInfo={libraryGame}/>}></Route>
                <Route path="userlibrary" element={<GameFinder search={() => handleStoreSearch} gameInfo={storeGame}/>}></Route>
              </Route>
            </Routes>
          </AnimatePresence>
        </div>
      </activeModalContext.Provider>
    </librarySelectionContext.Provider>
  )
}

export default App
