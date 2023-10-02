FROM node:16 as base
WORKDIR /app
COPY ./client ./client
COPY ./common ./common
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./tsconfig.json ./tsconfig.json
RUN yarn install

FROM base as build
RUN yarn workspace client build
CMD ["yarn", "workspace", "client", "start"]

FROM base as dev
CMD ["yarn", "workspace", "client", "dev", "--host"]

FROM nginx as prod
COPY --from=build /app/client/dist /usr/share/nginx/html