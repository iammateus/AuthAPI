# Canvas API

An API of authentication for the project [Canvas](https://github.com/iammateus/Canvas).

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

The file .env.dev has all the environment variabes necessary and their values to run the application.

## License

[MIT](https://github.com/iammateus/CanvasAPI/blob/master/LICENSE)
