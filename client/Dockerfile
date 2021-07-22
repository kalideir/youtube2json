FROM node

WORKDIR /usr/src/client
COPY package.json /usr/src/client

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]