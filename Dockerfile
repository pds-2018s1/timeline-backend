FROM node:9-alpine

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . . 

ENV NODE_ENV=production

EXPOSE 3001
CMD yarn start-prod