# devdocs/Dockerfile
# ----------------
# Stage 1: install & build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package metadata & lockfile
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the devdocs source and build
COPY . .
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
