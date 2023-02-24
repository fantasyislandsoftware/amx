FROM  ubuntu as backend

# APK Packages
RUN apt update
RUN apt-get install npm nano -y

# NPM
WORKDIR /home/node/app
COPY /backend/package*.json ./
RUN npm i