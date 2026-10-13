# DroneDelight — Client

Frontend of the DroneDelight food delivery app, built with React and Tailwind CSS
and bundled with Vite.

## Requirements

- Node.js 18+

## Setup

```bash
npm install
cp example.env .env
npm run dev
```

`example.env` provides the environment variables:

| Variable       | Description                                             |
| -------------- | ------------------------------------------------------- |
| `VITE_API_URL` | Base URL of the backend API, e.g. `https://server-name.com/api` |

## Scripts

| Script            | Description                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start the Vite dev server               |
| `npm run build`   | Build for production into `dist/`       |
| `npm run preview` | Preview the production build            |
| `npm run lint`    | Run ESLint                              |

## Structure

```
src/
├── assets/       images and icons
├── components/   reusable UI components
├── contexts/     React context (user state)
├── pages/        route-level pages
├── routes/       route definitions
├── App.jsx
└── main.jsx
```

## Libraries

- `react-router-dom` — routing
- `axios` — HTTP requests
- `tailwindcss` — styling
- `react-toastify` — notifications
- `react-awesome-reveal` — animations
- `nuka-carousel` — carousels
- `react-icons` — icons
- `react-spinners` — loading spinners
- `react-dom-confetti` — visual details

## Deployment

Deployed on Netlify. `netlify.toml` redirects every route to `/index.html` so that
client-side routing keeps working on refresh.

## Docker

In the root Docker image the client is built with `VITE_API_URL=/api`, so it calls
the API on the same origin and nginx proxies those requests to the backend. See the
root [`README.md`](../README.md) for the Docker and Cloud Run setup.

Note that Vite inlines `VITE_API_URL` at build time: changing it requires a rebuild,
which is why the relative `/api` path is used inside the container.
