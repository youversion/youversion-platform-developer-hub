#!/usr/bin/env bash

# deploy.sh - Build Docker images locally and deploy to Google Cloud Run for multiple services
# Usage: ./deploy.sh [tag]

set -eo pipefail

# Configuration
PROJECT_ID="yvplatform-dev"
REGION="us-central1"
REPO_NAME="youversion-platform-developer-hub"
TAG="${1:-latest}"

# Ensure Docker Buildx builder named "builder" exists
if ! docker buildx inspect builder >/dev/null 2>&1; then
  echo "Builder 'builder' not found; creating and using new builder..."
  docker buildx create --name builder --use
else
  echo "Using existing buildx builder 'builder'..."
  docker buildx use builder
fi

# Define services and their build contexts
# Format: service_name:context_directory
SERVICES=(
  "devdocs:devdocs"
  "bibles:bibles"
  "developer-hub:."
)

for entry in "${SERVICES[@]}"; do
  IFS=":" read -r SERVICE_NAME CONTEXT <<< "$entry"
  IMAGE_NAME="$SERVICE_NAME"
  IMAGE_URI="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:${TAG}"

  echo
  echo "-----------------------------------------------"
  echo "Building and pushing $SERVICE_NAME to Artifact Registry: $IMAGE_URI"
  echo "Context directory: $CONTEXT"

  if [[ "$SERVICE_NAME" == "devdocs" ]]; then
    echo "Building $SERVICE_NAME with standard docker build (amd64 only)"
    # Build using root context to include shared directory
    docker build \
      -t "$IMAGE_URI" \
      -f "$CONTEXT/Dockerfile" \
      .
    docker push "$IMAGE_URI"
  else
    echo "Building $SERVICE_NAME with buildx multi-platform (amd64,arm64)"
    docker buildx build --platform linux/amd64,linux/arm64 \
      -t "$IMAGE_URI" \
      --push \
      -f "$CONTEXT/Dockerfile" \
      "$CONTEXT"
  fi

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
