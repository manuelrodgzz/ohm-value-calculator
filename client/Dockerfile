FROM node:16 as build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html