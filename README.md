# DroneDelight

A food delivery application focused on usability, speed and a clean design.

## Structure

- `client/` — frontend built with React and Tailwind CSS (Vite)
- `server/` — backend built with Node.js, Express and MongoDB

## Features

- Menu with product listing
- Shopping cart and checkout
- User registration and login
- Favorites and a saved order form per user
- Order history per user

## Tech stack

| Part     | Stack                                                   |
| -------- | ------------------------------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS 4, React Router, Axios     |
| Backend  | Node.js, Express 5, MongoDB (Mongoose), JWT             |

## Getting started

Each part is installed and run independently.

```bash
# client
cd client
npm install
cp example.env .env   # set VITE_API_URL
npm run dev

# server
cd server
npm install
cp example.env .env   # set MONGO_URI, JWT_SECRET, ...
npm start
```

See [`client/README.md`](client/README.md) and [`server/README.md`](server/README.md)
for the details of each part.

## Environment variables

| Directory | Variable         | Description                                        |
| --------- | ---------------- | -------------------------------------------------- |
| `client`  | `VITE_API_URL`   | Base URL of the API, e.g. `https://server-name.com/api` |
| `server`  | `MONGO_URI`      | MongoDB connection string                          |
| `server`  | `JWT_SECRET`     | Secret used to sign JWTs                           |
| `server`  | `JWT_EXPIRATION` | JWT lifetime, e.g. `1h`                            |
| `server`  | `PORT`           | Port the server listens on (default `3000`)        |

## Deployment

- Frontend is deployed on Netlify.
- Backend is hosted on Render.

Render has cold start times, so the backend exposes a `GET /api/ping` route and the
frontend shows a loading indicator until the server responds.

## Known limitations and possible improvements

- Token-based authentication (JWT) is started but not finished, so the routes are
  not protected yet.
- Loading spinners while images load could improve the experience.
- A more detailed product page (with ingredients) and filtering based on them would
  round out the app.
- Code structure: move API call logic out of components into separate files, and
  split pages into smaller, reusable components.
