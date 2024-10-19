FROM node:20.15.1-alpine

# RUN apt-get update && apt-get install -y jpegoptim pngquant
RUN apk add --no-cache jpegoptim pngquant
RUN yarn add --platform=linux --arch=arm64v8 sharp

# Set the path to binary dependencies in the environment
ENV PATH=/node_modules/.bin:$PATH
ARG BUILD_TAG=${BUILD_TAG}
ENV BUILD_TAG=${BUILD_TAG}
COPY package.json /
RUN npm install --legacy-peer-deps --network-timeout=300000

# Copy all contents from the local working directory to the container
COPY . /app

WORKDIR /app

RUN npm run build

CMD ["astro", "dev", "run", "--host", "--port", "3000"]