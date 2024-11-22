import { useState, useEffect } from 'react'
import './FloatingText.css'

function FloatingText() {
    const [games, setGames] = useState([]);
    const [spawnedGames, setSpawnedGames] = useState([]);
    const spawnRate = 200;
    //This function should probably cache games in the browser if someone's visited the site before.
    // It'll also be responsible for just setting games at the start, will probably rely on an API call.
    useEffect(() => {
        setGames([{name: 'Battlefield', link: "#"}, {name: 'Halo 3', link: '#'}, {name: 'Fallout 4', link: '#'}]);
    },[])


    const spawnGame = () => {
        const game = games[Math.floor(Math.random() * games.length)]
        const gameRender = {
            title:  game.name.toUpperCase(),
            link: game.link,
            speed: Math.random() * (10 - 7) + 7,
            size: Math.random() * (2 - 1) + 1,
            top: Math.random() * window.innerHeight,
            id: crypto.randomUUID(),
        }
        console.log(gameRender);
        setSpawnedGames((previousSpawns) => [...previousSpawns, gameRender]);
    }

    const deSpawnGame = (id) => {
        setSpawnedGames((prevGames) => prevGames.filter((game) => game.id !== id));
    };

    useEffect(() => {
        const spawnGames = setInterval(() => {
            spawnGame()
        },(spawnRate))
        return () => clearInterval(spawnGames);
    },[games])

    useEffect(() => {
        console.log(spawnedGames);
    },[spawnedGames])

  return (
    <div className="floatingText">
        {spawnedGames.map((game) => (
            <a key={game.id} href={game.link} className='floatingText__game'
            style={{
                top: `${game.top}px`,
                size: `${game.size}`,
                animationDuration: `${game.speed}s`,
            }}
            onAnimationEnd={() => deSpawnGame(game.id)}
            > {game.title} </a>
        ))} 
    </div>
  )
}

export default FloatingText