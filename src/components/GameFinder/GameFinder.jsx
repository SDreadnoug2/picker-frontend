import "./GameFinder.css";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../../contexts/LoggedInContext";
function GameFinder({ librarySelection, search, gameInfo, isLoading }) {
  const {isLoggedIn, logIn} = useContext(LoggedInContext);
  if (isLoading) {
    return (
      <div className="game-finder">
        <span className="loading">Loading<span>.</span><span>.</span><span>.</span></span>
      </div>
    );
  }

  if(!isLoggedIn && librarySelection === "userlibrary"){
    return (
      <div className="game-finder">
        <button type="button" onClick={logIn} className="game-finder__randomizer">Please Login first!</button>
    </div>
    )
  }

  return (
    <div className="game-finder">
      {!gameInfo || !gameInfo.title ? (
        <button
          onClick={search}
          className="game-finder__randomizer"
          type="button"
        >
          Click to Search
        </button>
      ) : (
        <>
          <ImageCarousel images={gameInfo.images} />
          <a href={gameInfo.weblink} target="blank" className="game-finder__game_link">{gameInfo.title}</a>
          {window.location.pathname === "/libraries/steamstore" && 
          ( <h3 className="game-finder__price">{gameInfo.price}</h3>)}
          {window.location.pathname === "/libraries/userlibrary" && 
          ( <h3 className="game-finder__title">{gameInfo.playTime}</h3>)}
          <p className="game-finder__description">{gameInfo.description}</p>
          <button
            onClick={search}
            className="game-finder__randomizer"
            type="button"
          >
            Pick another game
          </button>
        </>
      )}
    </div>
  );
}

export default GameFinder;
