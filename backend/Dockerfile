FROM  ubuntu as backend

# APK Packages
RUN apt update
RUN apt-get install npm nano wget -y

WORKDIR /home/node/app

RUN mkdir develop

WORKDIR /home/node/app/develop
RUN wget -q "http://sun.hasenbraten.de/vasm/release/vasm.tar.gz"
RUN tar xvf vasm.tar.gz
RUN rm vasm.tar.gz
WORKDIR /home/node/app/develop/vasm
RUN make CPU=m68k SYNTAX=mot

WORKDIR /home/node/app/develop
RUN wget -q "http://sun.hasenbraten.de/~frank/projects/download/vdam68k.tar.gz"
RUN tar xvzf vdam68k.tar.gz
RUN rm vdam68k.tar.gz
WORKDIR /home/node/app/develop/vda/M68k
ENV PATH="$PATH:/home/node/app/develop/vda/M68k"
RUN make

WORKDIR /home/node/app/develop
COPY /backend/ndk/NDK_3.9 ./NDK_3.9

WORKDIR /home/node/app
COPY /backend/scripts ./scripts
ENV PATH="$PATH:/home/node/app/scripts"
WORKDIR /home/node/app/scripts
RUN chmod +x vasm.sh

# NPM
WORKDIR /home/node/app
COPY /backend/package*.json ./
RUN npm i