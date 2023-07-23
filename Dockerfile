FROM node:18
WORKDIR /app
COPY package.json /app
RUN npm install 
RUN npm install -g nodemon
COPY . /app
ENV PORT=8080
EXPOSE 8080
CMD ["nodemon", "app.js"]