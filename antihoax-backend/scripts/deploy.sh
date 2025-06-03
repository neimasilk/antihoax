#!/bin/bash

# Basic Deployment Script for AntiHoax Backend
# This script assumes you are running it on a server where Docker and Docker Compose are installed,
# and the user running the script has permissions to execute docker commands.

# --- Configuration ---
APP_DIR="/opt/antihoax-backend" # Directory where your app is deployed on the server
GIT_BRANCH="main" # Or your deployment branch, e.g., 'production'
DOCKER_COMPOSE_FILE="docker-compose.yml" # Assuming it's in the APP_DIR
SERVICE_NAME="antihoax-backend" # As defined in your docker-compose.yml

# Optional: Load environment variables from a .env file if needed for the script itself
# if [ -f "${APP_DIR}/.env" ]; then
#   export $(grep -v '^#' ${APP_DIR}/.env | xargs)
# fi

# --- Helper Functions ---
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

error_exit() {
  log "ERROR: $1"
  exit 1
}

# --- Main Deployment Steps ---

# 1. Navigate to the app directory
log "Navigating to application directory: ${APP_DIR}"
cd ${APP_DIR} || error_exit "Failed to navigate to ${APP_DIR}."

# 2. Pull latest changes from Git
log "Pulling latest changes from Git branch '${GIT_BRANCH}'..."
git checkout ${GIT_BRANCH} || error_exit "Failed to checkout branch '${GIT_BRANCH}'."
git pull origin ${GIT_BRANCH} || error_exit "Failed to pull from Git."
# Optional: If you have submodules
# git submodule update --init --recursive

# 3. Rebuild Docker images (if necessary, e.g., if Dockerfile or source code changed)
log "Rebuilding Docker image for service '${SERVICE_NAME}'..."
# --no-cache can be added if you want to force a full rebuild without using cache
docker-compose -f ${DOCKER_COMPOSE_FILE} build ${SERVICE_NAME} || error_exit "Docker build failed."

# 4. Stop and remove old containers, then start new ones
log "Stopping and restarting service '${SERVICE_NAME}' using Docker Compose..."
docker-compose -f ${DOCKER_COMPOSE_FILE} down # Stop and remove containers, networks, etc.
docker-compose -f ${DOCKER_COMPOSE_FILE} up -d ${SERVICE_NAME} || error_exit "Docker Compose up failed for ${SERVICE_NAME}."
# Use `docker-compose up -d` if you want to bring up all services in the compose file.

# 5. Optional: Prune old/unused Docker images and volumes to save space
log "Pruning unused Docker images and volumes..."
docker image prune -f
docker volume prune -f # Be careful with this if you have important data in unnamed volumes

# 6. Optional: Run database migrations (if applicable)
# log "Running database migrations..."
# docker-compose -f ${DOCKER_COMPOSE_FILE} exec ${SERVICE_NAME} npm run migrate # Example command

# 7. Optional: Perform a health check or smoke test
# log "Performing health check..."
# sleep 5 # Give the service a moment to start
# HEALTH_CHECK_URL="http://localhost:${PORT:-3001}/api/health" # Adjust if needed
# if curl -sf ${HEALTH_CHECK_URL} > /dev/null; then
#   log "Health check passed."
# else
#   error_exit "Health check failed at ${HEALTH_CHECK_URL}."
# fi

log "Deployment of '${SERVICE_NAME}' completed successfully."
exit 0
