FROM node

WORKDIR /frontend
COPY ./package.json .
RUN npm install 
COPY . .

# esto es porque a partir de node 17 eliminaron una biblioteca de crypto vieja que usa webpack 4
# lo ideal sería updatear webpack (o bajar la versión de node)
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run generate 

EXPOSE 3030
CMD [ "npm", "run", "start" ]