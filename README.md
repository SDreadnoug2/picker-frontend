-- PICKAGAME PROJECT --
Welcome to the "PICKAGAME" project's github!

This project revolves around the usage of Steam's API, and is meant to help people find new games,
or for those who have expansive libraries, play games they haven't thought of in a while!

The frontend side's technologies feature Framer Motion for page transitions, and is entirely built
using the React framework, and was set up using vite and npm.

The backend is still currently in development, but will use a mongodb to store steam's current games' list,
and express to help interact with the user when accessing their steam library.
It is being hosted via nginx on a remote server using google cloud's VMs.

Speaking of user interaction, this will be my first introduction to the implementation of OAUTH, which will be utilized
to speed up users' access to their library, without having to share their password with gamepicker. Epic!!

At any rate, the frontend of the site is currently being hosted at both:

https://www.pickagame.app
-- OR --
https://pickagame.app


If you would like to set up this project for yourself please follow these instructions:

1. Via git, clone the repository (i.e. git clone https://github.com/SDreadnoug2/game-picker-frontend/)
2. inside of the downloaded repo, install the necessary packages using npm install
3. For building, simply run npm run build, the created dist folder can then be used to rehost the site!

NOTE
If you would just like to run the project in browser without building, the script npm run dev
can also be run to launch the app on a local host.

This is obviously an open source project, and there is potential to build off of it, please let me know 
if you do!

Nicholas
