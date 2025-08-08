#!/usr/bin/env bash

# deploy.sh - Build Docker images locally and deploy to Google Cloud Run for multiple services
# Usage: ./deploy.sh [tag] [service]
#   tag: Optional Docker image tag (default: latest)
#   service: Optional service to deploy (devdocs, bibles-directory, developer-hub)

set -eo pipefail

# Configuration
PROJECT_ID="yvplatform-dev"
REGION="us-central1"
REPO_NAME="youversion-platform-developer-hub"
TAG="${1:-latest}"
SERVICE_ARG="${2:-}"

# Ensure builder exists
if ! docker buildx inspect builder >/dev/null 2>&1; then
  echo "Builder 'builder' not found; creating and using new builder..."
  docker buildx create --platform linux/amd64,linux/arm64 --name builder --use --driver docker-container
else
  echo "Using existing buildx builder 'builder'..."
  docker buildx use builder
fi

# Define services and their build contexts (service_name:context_directory)
SERVICES=(
  "devdocs:devdocs"
  "bibles-directory:bibles"
  "developer-hub:."
)

# If a specific service is requested, validate it
if [ -n "$SERVICE_ARG" ]; then
  VALID=(devdocs bibles-directory developer-hub)
  if [[ ! " ${VALID[*]} " =~ " $SERVICE_ARG " ]]; then
    echo "Invalid service: $SERVICE_ARG"
    echo "Valid services are: ${VALID[*]}"
    exit 1
  fi
  echo "Deploying only service: $SERVICE_ARG"
fi

for entry in "${SERVICES[@]}"; do
  IFS=":" read -r SERVICE_NAME CONTEXT <<< "$entry"

  # Skip if we're deploying a specific service
  if [ -n "$SERVICE_ARG" ] && [ "$SERVICE_NAME" != "$SERVICE_ARG" ]; then
    continue
  fi

  IMAGE_URI="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}:${TAG}"

  echo
  echo "-----------------------------------------------"
  echo "Building and pushing $SERVICE_NAME to Artifact Registry: $IMAGE_URI"
  echo "Context directory: $CONTEXT"

  docker buildx build --platform linux/amd64,linux/arm64 \
    -t "$IMAGE_URI" \
    --push \
    -f "$CONTEXT/Dockerfile" \
    .

  echo
  echo "Deploying to Cloud Run service: $SERVICE_NAME"
  gcloud run deploy "$SERVICE_NAME" \
    --image "$IMAGE_URI" \
    --project "$PROJECT_ID" \
    --region "$REGION" \
    --platform managed \
    --allow-unauthenticated

  URL=$(gcloud run services describe "$SERVICE_NAME" \
    --project "$PROJECT_ID" \
    --region "$REGION" \
    --platform managed \
    --format="value(status.url)")
  echo "Service '$SERVICE_NAME' is available at: $URL"
  echo "-----------------------------------------------"

done
