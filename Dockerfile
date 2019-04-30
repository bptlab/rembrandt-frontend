FROM node:alpine
WORKDIR /usr/src/rembrandt-frontend
COPY . .
RUN npm install
CMD npm start
