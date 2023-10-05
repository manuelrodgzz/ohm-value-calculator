# Ohm Value Calculator

## Requirements:
- Node JS: >=18.18.0
- Docker: >=24.0.0
- Docker compose: >=2.0.0

You can verify if you have already installed these versions using:

```shell
node -v
docker -v
docker compose version
```

Here you can find the documentations to install these dependencies:

- [Docker](https://docs.docker.com/engine/install/)
- [Node JS](https://nodejs.org/en/download) or [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) in case you prefer to easily switch between node versions

## Before running the project
You will find a file called `.env.example` which contains all the required environment variables. You have to create a `.env` file in the root of the project containing these variables (you can assign whatever value you want).

There are 4 more files you need to create in the `/database` folder:

- mongo_client_user.txt
- mongo_client_pass.txt
- mongo_root_user.txt
- mongo_root_pass.txt

In these files you must add the usernames and passwords that will be assigned to the root user and the user with the *readonly* role as plain text. For example:
```shell
echo 'my_user' > ./database/mongo_root_user.txt
echo 'Sup3rS3cr37Pa55w0rd' > ./database/mongo_root_pass.txt
```

## Run development mode
```shell
yarn dev
```

Services will run on the following ports:
- React: http://localhost:5173/
- Express API: http://localhost:3001/

## Run production mode
```shell
yarn start
```

Services will run on the following ports:
- React: http://localhost:8080/
- Express API: http://localhost:3001/

## Run tests
```shell
yarn workspace server test
```