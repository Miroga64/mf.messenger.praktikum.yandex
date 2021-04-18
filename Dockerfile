FROM node:12
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 0
RUN npx webpack
CMD [ "node", "server.js" ]


