FROM node:12.16.1-alpine3.11
WORKDIR /app
COPY package.json /app
RUN npm install 
RUN npm install -g nodemon
COPY . /app
EXPOSE 8080
CMD ["nodemon", "app.js"]