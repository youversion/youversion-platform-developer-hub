# bibles/Dockerfile
# ----------------
# Stage 1: install & build
FROM node:20-slim AS builder
WORKDIR /app

# Copy shared folder (side-by-side with bibles)
COPY shared/ ./shared/

# Copy bibles metadata & config
COPY bibles/package.json bibles/yarn.lock bibles/tsconfig.json bibles/next.config.ts ./bibles/

# Install dependencies inside bibles
WORKDIR /app/bibles
RUN yarn install --frozen-lockfile

# Copy the rest of the bibles source and public assets
COPY bibles/src ./src
COPY bibles/public ./public

# Build the Next.js project
RUN yarn build

# Stage 2: runtime
FROM node:20-slim AS runtime
WORKDIR /app/bibles

# Install a static server for serving the build
RUN yarn global add serve

# Copy build artifacts and runtime dependencies
COPY --from=builder /app/bibles/node_modules ./node_modules
COPY --from=builder /app/bibles/.next ./.next
COPY --from=builder /app/bibles/public ./public

# Expose port and serve the static build
EXPOSE 8080
CMD ["serve", "-s", ".next", "-l", "8080"]
