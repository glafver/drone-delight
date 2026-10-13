# DroneDelight

A food delivery application focused on usability, speed and a clean design.

## Structure

- `client/` — frontend built with React and Tailwind CSS (Vite)
- `server/` — backend built with Node.js, Express and MongoDB
- `Dockerfile` — single-container build that runs the client (nginx) and the server (Node)
- `docker-compose.yml` — local stack with MongoDB
- `deploy/` — Cloud Run deployment script

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

| Directory | Variable         | Description                                             |
| --------- | ---------------- | ------------------------------------------------------- |
| `client`  | `VITE_API_URL`   | Base URL of the API, e.g. `https://server-name.com/api` |
| `server`  | `MONGO_URI`      | MongoDB connection string                               |
| `server`  | `JWT_SECRET`     | Secret used to sign JWTs                                |
| `server`  | `JWT_EXPIRATION` | JWT lifetime, e.g. `1h`                                 |
| `server`  | `PORT`           | Port the server listens on (default `3000`)             |

## Docker

The whole app runs in one container: nginx serves the built frontend and proxies
`/api` to the Node backend running next to it. Because the browser talks to the
same origin, there are no CORS issues and no need to know the public URL at build
time.

Start the stack (app + MongoDB):

```bash
docker compose up --build
```

The app is then available at <http://localhost:8090>. Change the host port with the
`APP_PORT` environment variable:

```bash
APP_PORT=8080 docker compose up --build
```

Load sample menu data into MongoDB (optional):

```bash
docker compose exec app node server/seed.js
```

Useful commands:

```bash
docker compose logs -f app     # follow logs
docker compose down            # stop
docker compose down -v         # stop and delete the MongoDB volume
```

To build and run the image without Compose (an external MongoDB is required):

```bash
docker build -t drone-delight .
docker run --rm -p 8080:8080 \
  -e MONGO_URI="mongodb://host.docker.internal:27017/drone-delight" \
  -e JWT_SECRET="change-me" \
  drone-delight
```

Inside the container `PORT` (default `8080`) is the public port served by nginx,
while `SERVER_PORT` (default `3000`) is the internal port used by the Node backend.
Cloud Run sets `PORT` automatically.

## Deploy to Cloud Run

Cloud Run is stateless, so MongoDB must be hosted externally (for example MongoDB
Atlas). Cloud Run egress IP addresses are not static, so the Atlas cluster has to
accept connections from `0.0.0.0/0` (or use a VPC connector).

Prerequisites: the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) and
an authenticated account (`gcloud auth login`).

Then, from the repository root:

```powershell
.\deploy\deploy-cloud-run.ps1 `
  -ProjectId my-project `
  -MongoUri "mongodb+srv://user:pass@cluster/drone-delight" `
  -JwtSecret "a-long-random-secret"
```

The script enables the required APIs, creates an Artifact Registry repository,
builds the image, and deploys a single Cloud Run service. At the end it prints the
service URL.

Equivalent manual steps:

```bash
gcloud config set project my-project
gcloud artifacts repositories create drone-delight --repository-format=docker --location=europe-north1
gcloud builds submit --tag europe-north1-docker.pkg.dev/my-project/drone-delight/app:latest .
gcloud run deploy drone-delight \
  --image europe-north1-docker.pkg.dev/my-project/drone-delight/app:latest \
  --region europe-north1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "MONGO_URI=...,JWT_SECRET=...,JWT_EXPIRATION=1h"
```

For production, prefer Secret Manager over plain environment variables:

```bash
gcloud run deploy drone-delight \
  --set-secrets "MONGO_URI=mongo-uri:latest,JWT_SECRET=jwt-secret:latest"
```

## Known limitations and possible improvements

- Token-based authentication (JWT) is started but not finished, so the routes are
  not protected yet.
- Loading spinners while images load could improve the experience.
- A more detailed product page (with ingredients) and filtering based on them would
  round out the app.
- Code structure: move API call logic out of components into separate files, and
  split pages into smaller, reusable components.
