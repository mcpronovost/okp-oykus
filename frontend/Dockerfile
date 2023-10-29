FROM node:lts

WORKDIR /frontend

COPY ./public ./public
COPY ./src ./src
COPY ./astro.config.mjs ./astro.config.mjs
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm install @esbuild/linux-x64 --save-dev
RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080
