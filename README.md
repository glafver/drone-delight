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

### Automatic deploy with GitHub Actions

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds
the image and deploys it to Cloud Run on every push to `main` (and on manual runs).
Cloud Build is not involved — the image is built on the GitHub runner.

One-time setup, run in the [Cloud Shell](https://console.cloud.google.com/) (it has
`gcloud` installed and already authenticated):

```bash
bash deploy/setup-github-actions.sh <PROJECT_ID>
```

The script enables the required APIs, creates the `github-deployer` service account
with the needed roles, creates the Artifact Registry repository, and writes a service
account key. It then prints what to configure in the repository:

Settings → Secrets and variables → Actions

| Kind      | Name                   | Value                                   |
| --------- | ---------------------- | --------------------------------------- |
| Secret    | `GCP_SA_KEY`           | full content of the generated JSON key  |
| Secret    | `MONGO_URI`            | MongoDB Atlas connection string         |
| Secret    | `JWT_SECRET`           | a long random string                    |
| Variable  | `GCP_PROJECT_ID`       | your Google Cloud project ID            |
| Variable  | `GCP_REGION`           | optional, default `europe-west1`        |
| Variable  | `CLOUD_RUN_SERVICE`    | optional, default `drone-delight`       |
| Variable  | `ARTIFACT_REGISTRY_REPO` | optional, default `drone-delight`     |

After that, pushing to `main` deploys automatically. The service URL is shown on the
Cloud Run page and in the workflow run summary.

### Manual deploy with gcloud

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
