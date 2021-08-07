FROM node:12
WORKDIR /backend
COPY /backend/package.json .
RUN npm install
RUN npm install nodemon -g
COPY /backend .
EXPOSE 3000
CMD [ "npm", "start" ]
