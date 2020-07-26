FROM node:latest

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm -g install react-scripts 

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 3000

CMD [ "yarn", "start" ]