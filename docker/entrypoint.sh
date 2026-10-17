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

# Wait for the API to accept connections before starting nginx. Cloud Run marks a
# revision ready as soon as something listens on $PORT, so without this the first
# request after a cold start gets a 502 from nginx.
echo "Waiting for the API on port ${INTERNAL_PORT}..."
api_ready=0
for _ in $(seq 1 120); do
  if ! kill -0 "$api_pid" 2>/dev/null; then
    echo "The API process exited during startup." >&2
    exit 1
  fi

  if (echo > "/dev/tcp/127.0.0.1/${INTERNAL_PORT}") 2>/dev/null; then
    api_ready=1
    break
  fi

  sleep 0.5
done

if [ "$api_ready" != "1" ]; then
  echo "The API did not start listening on port ${INTERNAL_PORT}." >&2
  exit 1
fi

echo "API is up."

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
