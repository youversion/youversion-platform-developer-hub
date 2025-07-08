#!/usr/bin/env bash

# deploy.sh - Build Docker image locally and deploy to Google Cloud Run
# Usage: ./deploy.sh

set -eo pipefail

# Configuration
PROJECT_ID="yvplatform-dev"
REGION="us-central1"
REPO_NAME="youversion-platform-developer-hub"
IMAGE_NAME="$REPO_NAME"
TAG="latest"
SERVICE_NAME="developer-hub"

IMAGE_URI="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:${TAG}"

# Ensure Docker Buildx is set up
if docker buildx inspect builder >/dev/null 2>&1; then
  docker buildx rm builder
fi

if ! docker buildx ls | grep -q "builder"; then
  echo "Creating and using buildx builder..."
  docker buildx create --name builder --use
fi

echo "Building and pushing multi-platform image to Artifact Registry: $IMAGE_URI"
docker buildx build --platform linux/amd64,linux/arm64 \
  -t "$IMAGE_URI" --push .

# Deploy to Cloud Run
echo "Deploying to Cloud Run service: $SERVICE_NAME"
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_URI" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated

# Output service URL
URL=$(gcloud run services describe "$SERVICE_NAME" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --platform managed \
  --format="value(status.url)")
echo "Service is available at: $URL"