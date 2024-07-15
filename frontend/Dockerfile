FROM node:20.15.1-bullseye-slim AS base
LABEL maintainer="M-C Pronovost"

COPY . /code/
WORKDIR /code

RUN npm install -g npm

FROM base AS deps

WORKDIR /code
RUN npm install

# FROM deps AS build
# RUN npm run build

FROM base
COPY --from=deps /code/node_modules /code/node_modules
# COPY --from=build /code/.next /code/.next

EXPOSE 3000

CMD ["npm", "run", "start"]