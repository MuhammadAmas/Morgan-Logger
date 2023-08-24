FROM node:alpine as base

WORKDIR /morgan # current project name 

COPY package.json ./

RUN rm -rf node_modules && npm i

COPY . .

CMD ["node",  "index.js"]