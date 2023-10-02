FROM node:18 as base
WORKDIR /app
COPY ./server ./server
COPY ./common ./common
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./tsconfig.json ./tsconfig.json
RUN yarn install

FROM base as prod
RUN yarn workspace server build
CMD ["yarn", "workspace", "server", "start"]

FROM base as dev
CMD ["yarn", "workspace", "server", "dev"]
