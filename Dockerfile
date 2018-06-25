FROM node:9-alpine

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . . 

EXPOSE 3001
CMD yarn start