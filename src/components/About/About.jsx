import './About.css';

function About({closeModal}) {

    return (
        <div className="about">
            <div className="about__container">
                <button onClick={() => closeModal()} type="button" className='about__close'></button>
                <h1 className='about__title'>What is Game Picker?</h1>
                <p className="about__text">Game picker was designed for those moments when you're sitting there, starting at your steam library, and have no clue what to play next. It looks at the games you have available, and picks one at random for you to get back into. You also have the ability to find new games, you can switch between your steam library and the steam store with the gear icon on the splash page! The code for this site is also available via the github link here, or at the top of the page. This app was designed in React, and uses the Steam API.</p>
                <p className="about__subtext">Nicholas</p>
            </div>
        </div>
    )

}

export default About;