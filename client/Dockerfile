FROM node:16 as base
WORKDIR /app
COPY . .
RUN yarn install

FROM base as build
RUN yarn build
CMD ["yarn", "start"]

FROM base as dev
CMD ["yarn", "dev", "--host"]

FROM nginx as prod
COPY --from=build /app/dist /usr/share/nginx/html