FROM node:16 as base
WORKDIR /app
COPY . .
RUN yarn install

FROM base as prod
RUN yarn build
CMD ["node", "dist"]

FROM base as dev
CMD ["yarn", "dev"]
