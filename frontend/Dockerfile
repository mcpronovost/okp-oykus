FROM node:20.15.1-alpine
LABEL maintainer="M-C Pronovost"

RUN apk add --no-cache jpegoptim pngquant
ENV PATH=/node_modules/.bin:$PATH

COPY package.json /
RUN yarn install

COPY . /app
WORKDIR /app

EXPOSE 3000

CMD ["astro", "dev", "--host", "--port", "3000"]
