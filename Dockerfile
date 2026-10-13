# syntax=docker/dockerfile:1

########################################
# Stage 1 - build the client (Vite)
########################################
FROM node:22-alpine AS client-build
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/ ./
# In the single-service setup the client talks to the API through nginx,
# so a relative base path is all we need.
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

########################################
# Stage 2 - install server dependencies
########################################
FROM node:22-alpine AS server-deps
# build toolchain for native modules (bcrypt)
RUN apk add --no-cache python3 make g++
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev

########################################
# Stage 3 - runtime (nginx + node)
########################################
FROM node:22-alpine AS runtime
RUN apk add --no-cache nginx gettext bash

ENV NODE_ENV=production \
    PORT=8080 \
    SERVER_PORT=3000

WORKDIR /app

# backend
COPY --from=server-deps /app/server/node_modules ./server/node_modules
COPY server/ ./server/

# frontend (static files served by nginx)
COPY --from=client-build /app/client/dist /usr/share/nginx/html

# nginx config template + entrypoint
COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY docker/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8080
CMD ["/app/entrypoint.sh"]
