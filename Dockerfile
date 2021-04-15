FROM node:12
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
RUN npx webpack
CMD [ "node", "./server.js" ]



