#!/bin/sh
echo "Creating test .env file ..."
tee -a .env << END
# Application
PORT=3000

# Postgres
POSTGRES_USER=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_PASSWORD=postgres
POSTGRES_DB=product_db
