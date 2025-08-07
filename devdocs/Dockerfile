# devdocs/Dockerfile (fallback: serve devdocs directory after build)
# ---------------------------------------------------
# Stage 1: Install dependencies and build
FROM node:20-slim AS builder
WORKDIR /app

# Copy entire repo
COPY . /app

# Install and build inside devdocs
WORKDIR /app/devdocs
RUN npm ci --prefer-offline --silent
RUN npm run build

# Stage 2: serve static files
FROM node:20-slim
WORKDIR /app/devdocs

# Install serve
RUN npm install -g serve --silent

# Copy built devdocs (including any generated files)
COPY --from=builder /app/devdocs /app/devdocs

EXPOSE 8080
CMD ["serve", "-s", ".", "-l", "8080"]
