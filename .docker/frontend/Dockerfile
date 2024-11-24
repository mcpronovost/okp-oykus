# Base stage
FROM node:23-alpine
LABEL org.opencontainers.image.authors="mcpronovost"

# Set environment variables
ENV NODE_ENV=development
ENV NPM_CONFIG_LOGLEVEL=warn
ENV PATH=/node_modules/.bin:$PATH

# Update system packages
RUN apk update && apk upgrade --no-cache

# Create non-root user
RUN adduser -D oykus

# Set working directory and fix permissions
WORKDIR /app
RUN chown -R oykus:oykus /app

# Copy package.json and install dependencies as non-root
COPY --chown=oykus:oykus package.json /
RUN npm install --no-cache --verbose

# Switch to non-root user
USER oykus

# Copy the rest of the application source code
COPY --chown=oykus:oykus . .

# Expose the port for the Vite development server
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev", "--host"]