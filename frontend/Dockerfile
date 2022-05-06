FROM node:16-alpine

WORKDIR /frontend
COPY ./package.json .
RUN npm install 
COPY . .

ENV BACKEND_URL="http://backend:3030"
RUN npm run generate 

ENV NUXT_HOST="0.0.0.0"
EXPOSE 3000
CMD [ "npm", "run", "start" ]