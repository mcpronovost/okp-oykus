FROM node:20.15.1-bullseye-slim AS base
LABEL maintainer="M-C Pronovost"

COPY . /code/
WORKDIR /code

RUN npm install -g npm

FROM base AS build

WORKDIR /code
RUN npm install

# FROM deps AS build
# RUN npm run build

FROM base
COPY --from=build /code/node_modules /code/node_modules
# COPY --from=build /code/.next /code/.next

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]