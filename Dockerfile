FROM node:12
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
RUN npx webpack
CMD [ "node", "./server.js" ]


