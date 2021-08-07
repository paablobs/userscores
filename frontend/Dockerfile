FROM node:12
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY /frontend/package.json .
RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent
EXPOSE 3000
CMD [ "npm", "start" ]