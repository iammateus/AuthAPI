FROM node:15.3

WORKDIR /app

COPY . .

RUN yarn install

CMD yarn start