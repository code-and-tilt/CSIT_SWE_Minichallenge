FROM node:18
WORKDIR /app
COPY package.json /app
RUN npm install 
RUN npm install -g nodemon
COPY . /app
EXPOSE 8080
CMD ["nodemon", "app.js"]