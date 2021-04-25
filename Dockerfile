FROM node:12-alpine

ARG START_SCRIPT
ENV START_COMMAND=$START_SCRIPT

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

# Startup command
CMD npm run $START_COMMAND
