FROM node:16-alpine

WORKDIR /backend
COPY ./package.json .
RUN npm install 
COPY . .

EXPOSE 3030
CMD [ "npm", "run", "start" ]