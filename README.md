# 🏎️ F1 Dashboard

A full-stack web app that lets you explore Formula 1 stats across different seasons — driver standings, constructor standings, race results, and individual driver details. Built with React on the frontend and Node/Express on the backend, powered by the [Jolpi F1 API](https://api.jolpi.ca/ergast/).
 ```Check Out My Project 
https://f1-dashboard-cyan.vercel.app/
```


---

## What it does

You can browse F1 data by year — pick a season and the dashboard fetches live data for:

- **Driver Standings** — current championship positions with points
- **Constructor Standings** — team standings for any season
- **Race Results** — results from any round in the selected year
- **Driver Details** — individual driver profile with more granular stats

It's basically your go-to reference if you want to look up how a particular season played out without having to dig through Wikipedia.

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router v7
- Tailwind CSS v4
- Axios

**Backend**
- Node.js + Express
- Axios (for proxying requests to the Jolpi API)

**Data Source**
- [Jolpi / Ergast F1 API](https://api.jolpi.ca/ergast/) — free, no auth required

---

## Project Structure

```
F1-Dashboard/
├── client/          # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── .env         #client API's(not committed)
│
└── server/          # Express backend
    ├── controllers/
    ├── routes/
    └── .env         # PORT and any server config (not committed)
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### 1. Clone the repo

```bash
git clone https://github.com/Mohan-K10/F1-Dashboard.git
cd F1-Dashboard
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```
PORT=5001
```

Start the server:

```bash
npm run dev
```

### 3. Set up the client

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` folder:

```
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The app should now be running at `http://localhost:5173`.

---

## Environment Variables

The frontend uses Vite, so all env variables must be prefixed with `VITE_` to be accessible in the browser. Never hardcode `localhost` URLs in the source — always use `import.meta.env.VITE_API_URL`.

| Variable | Where | Description |
|---|---|---|
| `VITE_API_URL` | `client/.env` | Base URL of the Express server |
| `PORT` | `server/.env` | Port the Express server runs on |

> **Note:** Neither `.env` file is committed to this repo. You'll need to create them yourself.

---

## API Overview

The Express backend acts as a proxy between the React frontend and the Jolpi F1 API. This keeps the frontend clean and makes it easier to add caching or rate limiting later if needed.

Example routes:

```
GET /api/f1/:year/drivers        → Driver standings for a season
GET /api/f1/:year/constructors   → Constructor standings
GET /api/f1/:year/:round/results → Race results for a specific round
GET /api/f1/drivers/:driverId    → Individual driver info
```

---

## Screenshots

> Coming soon — will add once deployed.

---

## Roadmap

- [ ] Add race circuit maps
- [ ] Head-to-head driver comparison
- [ ] Lap time visualizations
- [ ] Dark/light theme toggle
- [ ] Deploy to Vercel + Render

---

## License

MIT — feel free to use this however you want.

---

## Author

Made by [Mohan Krishna](https://github.com/Mohan-K10) — a CS undergrad and F1 fan who decided to combine both interests into a project.
