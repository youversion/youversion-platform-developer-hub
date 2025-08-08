# devdocs/Dockerfile
# ----------------
# Stage 1: install & build
FROM node:20-slim AS builder
WORKDIR /app

# Copy package metadata & lockfile
COPY bibles/package.json bibles/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy bibles and shared config
COPY bibles/ ./bibles/
COPY shared/ ./shared/

RUN yarn build

# Stage 2: runtime
FROM node:18-alpine
WORKDIR /app

# Install a static server (serve)
RUN yarn global add serve

# Copy build artifacts from the builder stage
COPY --from=builder /app/build ./build

EXPOSE 8080

# Serve the static build
CMD ["serve", "-s", "build", "-l", "8080"]
