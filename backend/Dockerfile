#Base image
FROM node

#Download repository
RUN apt-get update
RUN git clone https://github.com/rdiazutn/utn-seguridad-en-apps-web.git
WORKDIR /utn-seguridad-en-apps-web/backend
RUN git pull

#Prepare the app
EXPOSE 8080
RUN npm install