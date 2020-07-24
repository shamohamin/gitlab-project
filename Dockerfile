FROM node:latest

WORKDIR /usr/src/app

RUN npm -g install react-scripts 

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 3000

CMD [ "yarn", "start" ]