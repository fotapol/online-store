#!/bin/sh
set -e

echo "Waiting for database..."

echo "Running migrations..."
npx medusa db:migrate

# Optional
# echo "Creating admin user..."
# npx medusa user:create --email admin@labtst.online --password supersecret || true

echo "Starting Medusa..."
exec "$@"