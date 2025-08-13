# devdocs/Dockerfile
# -------------------
# Multi-stage Dockerfile for building and serving DevDocs static site

# Stage 1: Build the static site
FROM node:22-slim AS builder
WORKDIR /app

# Copy devdocs and shared config
COPY devdocs/ ./devdocs/
COPY shared/ ./shared/

# Install dependencies and build inside devdocs
WORKDIR /app/devdocs
RUN npm ci --prefer-offline && npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy static files
COPY --from=builder /app/devdocs/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY --from=builder /app/devdocs/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
