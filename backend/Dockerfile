FROM node:12
WORKDIR /backend
COPY /backend/package.json .
RUN npm install
COPY /backend .
EXPOSE 3000
CMD [ "npm", "start" ]
