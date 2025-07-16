# Stage 1: Build the Vite React app
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.23-alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config to support client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy password file + fix perms
COPY .htpasswd /usr/share/nginx/html/.htpasswd
RUN \
  chmod 644 /usr/share/nginx/html/.htpasswd \
  && chown root:root /usr/share/nginx/html/.htpasswd

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
