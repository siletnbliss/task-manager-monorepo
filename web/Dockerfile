# Base image
FROM node:24.9.0-alpine AS base

# Install libc6-compat (needed for some native dependencies in Alpine)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable corepack to use the pnpm version defined in package.json
RUN corepack enable

# -----------------------------------------------------------------------------
# 1. DEPS: Install dependencies
# -----------------------------------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml ./

# Install dependencies using frozen lockfile
RUN pnpm install --frozen-lockfile

# -----------------------------------------------------------------------------
# 2. BUILDER: Build the source code
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run the build script
RUN pnpm run build

# -----------------------------------------------------------------------------
# 3. RUNNER: Production image
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public folder
COPY --from=builder /app/public ./public

# Copy the standalone build and static files
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Default port argument (will be overridden by ENV in docker-compose)
ARG APP_PORT=3000
ENV APP_PORT=${APP_PORT}

# Expose the port
EXPOSE ${APP_PORT}

# Start the application using server.js (created by output: standalone)
CMD ["node", "server.js"]