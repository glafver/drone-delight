#!/bin/bash
set -e

# Cloud Run injects PORT (default 8080) - this is the public HTTP port served by nginx.
PUBLIC_PORT="${PORT:-8080}"
# The Node backend listens only on this internal port; nginx proxies /api to it.
INTERNAL_PORT="${SERVER_PORT:-3000}"
export PUBLIC_PORT INTERNAL_PORT

# Render the nginx config, substituting only our own variables so that
# nginx variables such as $host and $uri are left untouched.
envsubst '${PUBLIC_PORT} ${INTERNAL_PORT}' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/http.d/default.conf

# Start the Node API in the background on the internal port only.
PORT="$INTERNAL_PORT" node /app/server/server.js &
api_pid=$!

# Start nginx in the foreground on the public port.
nginx -g 'daemon off;' &
nginx_pid=$!

terminate() {
  kill -TERM "$api_pid" "$nginx_pid" 2>/dev/null || true
}
trap terminate TERM INT

# If either process dies, shut the container down so Cloud Run restarts it.
wait -n "$api_pid" "$nginx_pid"
exit_code=$?

terminate
wait || true
exit "$exit_code"
