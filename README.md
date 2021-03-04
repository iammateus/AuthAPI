# Auth API

A Node.js authentication API that uses JWT to provide very simple endpoints, and straightforward user authentication.

This project has a basic behavior and it's intended to be the backbone of more complex user management.

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

The file .env.dev has all the necessary environment variabes and their values to run the application locally. It can be used as an example.

## License

[MIT](https://github.com/iammateus/AuthAPI/blob/master/LICENSE)
