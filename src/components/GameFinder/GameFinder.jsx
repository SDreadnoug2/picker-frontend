import "./GameFinder.css";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { useContext, useEffect, useState } from "react";
function GameFinder({ search, gameInfo, isLoading }) {
  if (isLoading) {
    return (
      <div className="game-finder">
        <h2 className="game-finder__title">Loading...</h2>
      </div>
    );
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
          <ImageCarousel classNam images={gameInfo.images} />
          <h3 className="game-finder__title">{gameInfo.title}</h3>
          <h3 className="game-finder__price">{gameInfo.price}</h3>
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
