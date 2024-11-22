import "./GameFinder.css"
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { useContext, useEffect, useState } from "react";
function GameFinder ({gameInfo, search}) {


    if(!gameInfo){
        return(
            <div className="GameFinder">
               
                <h2 className="GameFinder__title">Loading...</h2>
            </div>
        )
    }

    console.log(gameInfo.images);
    console.log(gameInfo.title);
    return (
        <div className='GameFinder'>
            {!gameInfo || !gameInfo.title ? (
                <button onClick={search()} className="GameFinder__randomizer" type="button">Click to Search</button>
            ) : (
            <>
                <ImageCarousel classNam images={gameInfo.images}/>
                <h3 className="GameFinder__title">{gameInfo.title}</h3>
                <h3 className="GameFinder__price">{gameInfo.price}</h3>
                <p className="GameFinder__description">{gameInfo.description}</p>
                <button onClick={search()} className="GameFinder__randomizer" type="button">Pick another game</button>
            </>    
            )}
        </div>
    )
}

export default GameFinder;