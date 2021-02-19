# Canvas API

An authentication API for the project [Canvas](https://github.com/iammateus/Canvas).

This API is not the real-time online service that will provide the means of playing Canvas in multiplayer mode, the goal of this project is to make it possible to sign-up and sign-in on the app.

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

[MIT](https://github.com/iammateus/CanvasAPI/blob/master/LICENSE)
