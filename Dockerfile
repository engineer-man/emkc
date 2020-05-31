FROM node:14.3.0-stretch

RUN apt update && apt install -y inotify-tools libjson-c-dev

RUN cd /opt && \
    git clone https://github.com/realtux/bmig && \
    cd bmig && \
    make && \
    make install

WORKDIR /opt/emkc/platform

CMD cd migrations && \
    bmig migrate && \
    cd .. && \
    ./start >> ../var/docker/logs/app.log 2>&1
