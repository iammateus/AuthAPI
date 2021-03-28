
# Auth API

A Node.js authentication API that uses JWT to provide very simple endpoints, and straightforward user authentication.

This project has a basic behavior and it's intended to be the backbone of more complex user management.

## Usage

Check the complete API documentation [here](https://editor.swagger.io/?url=https://raw.githubusercontent.com/iammateus/AuthAPI/master/openapi.yaml).

## Requeriments

1. This project runs on [Docker](https://docs.docker.com/).

## Installation

    $ docker-compose up

## Test

Run all tests

    $ yarn test

Run a specific test

    $ yarn test-search -- "<describeString> <itString>"

## Env

| Name | Value |
|--|--|
| DB_HOST| The MongoDB server Host |
| DB_PORT| The MongoDB server  Port|
| DB_NAME| The MongoDB database name|
| DB_USER| The MongoDB username for authentication|
| DB_PASS| The MongoDB password for authentication|
| WAIT_FOR_DATABASE_DELAY| The time in milliseconds that the aplication server must wait for the MongoDB server to be ready|
| AUTH_SECRET| Secret for JWT encryption|

*The file .env.dev has all the necessary environment variabes and their values to run the application locally. It can be used as an example.

## License

[MIT](https://github.com/iammateus/AuthAPI/blob/master/LICENSE)

