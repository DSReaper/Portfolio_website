# Modern Dark Portfolio (Express + EJS + GitHub Carousel)


A clean portfolio that fetches all public repos from a GitHub user and displays them in a carousel.


## Setup
1. Clone this folder.
2. `cp .env.example .env` and set `GITHUB_USERNAME`.
3. Put your photo at `public/images/me.jpg`.
4. `npm install`
5. `npm run dev`
6. Open http://localhost:3000


## Notes
- Server‑side fetch uses the GitHub REST API: `GET /users/{username}/repos`.
- Update text content in `server.js` → `profile` object.


## Deploy
- Works on Render, Railway, Fly.io, Heroku, etc.
- Set environment variables in your hosting provider.
