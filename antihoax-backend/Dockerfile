# antihoax-backend/Dockerfile

# ---- Base Node ----
# Use an official Node.js runtime as a parent image
# Using a specific LTS version is good practice (e.g., 18-alpine, 20-bookworm-slim)
FROM node:18-alpine As base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install system dependencies if needed for certain npm packages (e.g., build-tools for native modules)
# RUN apk add --no-cache python3 make g++ # Example for Alpine if node-gyp issues arise

# ---- Dependencies ----
# Install app dependencies using a separate layer to leverage Docker cache
FROM base As dependencies
RUN npm install --omit=dev --only=production
# If you have native modules that need compilation and want a smaller final image:
# RUN npm install --production --ignore-scripts # then handle node-gyp separately if needed

# ---- Build ----
# (Optional if you have a build step, e.g., for TypeScript)
# FROM base As build
# COPY . .
# RUN npm run build # Assuming you have a build script in package.json

# ---- Release ----
# Create a new stage for the final image from the base Node image
FROM base As release

# Set NODE_ENV to production
ENV NODE_ENV=production
# ENV PORT=3001 # Already in .env, but can be set here as a default

# Copy dependency modules from the 'dependencies' stage
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copy application code (ensure .dockerignore is properly set up)
# If you had a build stage:
# COPY --from=build /usr/src/app/dist ./dist # Example for TypeScript
# COPY --from=build /usr/src/app/package*.json ./
# For non-build projects:
COPY . .

# Expose the port the app runs on
EXPOSE ${PORT:-3001}
# Note: ${PORT:-3001} uses shell-style parameter expansion, which works in Dockerfile `EXPOSE`.
# However, the actual port used by Node will be from process.env.PORT inside server.js.

# Command to run the application
# Use dumb-init or tini to handle signals properly if your app doesn't handle them well
# CMD ["dumb-init", "node", "server.js"]
CMD [ "node", "server.js" ]

# ---- Development ----
# This stage is for development and includes devDependencies
FROM base AS development
ENV NODE_ENV=development
# Install all dependencies including devDependencies
RUN npm install
COPY . .
# Default command for development could be different, e.g., to run with nodemon
CMD [ "npm", "run", "dev" ]

# .dockerignore should include:
# node_modules
# .git
# .gitignore
# Dockerfile
# docker-compose.yml
# .env
# .env.* (except .env.example or .env.template if used in build)
# logs/
# coverage/
# *.log
# README.md (unless you want it in the image)
# docs/ (unless you want them in the image)
