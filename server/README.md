# DroneDelight — Server

Backend of the DroneDelight food delivery app, built with Node.js, Express and
MongoDB (via Mongoose).

## Requirements

- Node.js 18+
- A MongoDB database

## Setup

```bash
npm install
cp example.env .env
npm start
```

`example.env` provides the environment variables:

| Variable         | Description                                   |
| ---------------- | --------------------------------------------- |
| `MONGO_URI`      | MongoDB connection string                     |
| `JWT_SECRET`     | Secret used to sign JWTs                      |
| `JWT_EXPIRATION` | JWT lifetime, e.g. `1h`                       |
| `PORT`           | Port to listen on (default `3000`)            |

## Scripts

| Script      | Description                          |
| ----------- | ------------------------------------ |
| `npm start` | Start the server with `node server.js` |
| `npm run seed` | Insert sample menu data (see below) |

For development with auto-restart: `npx nodemon server.js --watch`.

## Sample data

`seed.js` contains sample menu data and is handy for local development. It replaces
all existing products by default:

```bash
npm run seed           # clear and insert sample products
npm run seed -- --keep # insert without clearing
```

## API

Base path: `/api`

| Method | Endpoint                   | Description                  |
| ------ | -------------------------- | ---------------------------- |
| GET    | `/api/ping`                | Health check                 |
| GET    | `/api/products`            | List all products            |
| POST   | `/api/orders`              | Create an order              |
| GET    | `/api/orders/:id`          | Get an order by ID           |
| GET    | `/api/orders/user/:userId` | Get all orders for a user    |
| POST   | `/api/users/register`      | Register a user              |
| POST   | `/api/users/login`         | Log in a user                |
| PATCH  | `/api/users/update/:id`    | Update a user's favorites    |
| PATCH  | `/api/users/save-form/:id` | Save a user's order form     |

## Structure

```
config/       database connection
controllers/  route handlers
models/       Mongoose models (Product, Order, User)
routes/       Express routers
server.js     app entry point
```

## Deployment

Hosted on Render. Because Render has cold start times, `GET /api/ping` is used as a
health check and the frontend waits (with a loading indicator) until the server
responds.
