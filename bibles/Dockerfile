# ┌── Build stage ────────────────────────────────────────────────
FROM node:20-slim AS builder
WORKDIR /app

# Copy shared folder (side-by-side with bibles)
COPY shared ./shared

# Copy bibles metadata & config
COPY bibles ./bibles

# Install dependencies inside bibles
WORKDIR /app/bibles
RUN yarn install --frozen-lockfile

# Build the Next.js project
RUN yarn build

# ┌── Production stage ──────────────────────────────────────────
FROM node:20-slim AS runtime
WORKDIR /app/bibles

# Only prod deps + compiled output
COPY --from=builder /app/bibles/package.json /app/bibles/yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy build artifacts and runtime dependencies
COPY --from=builder /app/bibles/next.config.js ./
COPY --from=builder /app/bibles/node_modules ./node_modules
COPY --from=builder /app/bibles/.next ./.next
COPY --from=builder /app/bibles/public ./public

# Expose port and serve the static build
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production
CMD ["yarn", "start"]
