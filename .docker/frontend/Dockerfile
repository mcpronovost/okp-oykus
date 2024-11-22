# Base stage
FROM node:23-alpine
LABEL org.opencontainers.image.authors="mcpronovost"

# Set environment variables
ENV NODE_ENV=development
ENV NPM_CONFIG_LOGLEVEL=warn
ENV PATH=/node_modules/.bin:$PATH

# Update system packages
RUN apk update && apk upgrade --no-cache

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker layer caching
COPY package.json /

# Install Node.js dependencies
RUN npm install --no-cache --verbose

# Set working directory
WORKDIR /app

# Copy the rest of the application source code
COPY . .

# Expose the port for the Vite development server
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev", "--host"]