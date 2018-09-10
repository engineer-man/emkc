FROM centos:centos7

WORKDIR /opt/emkc/platform

RUN yum -y install wget nano telnet gcc mysql-devel json-c-devel git make mysql

RUN cd /opt && \
    git clone https://github.com/ebrian/bmig && \
    cd bmig && \
    make && \
    make install

RUN cd /opt && \
    wget https://nodejs.org/dist/v8.11.4/node-v8.11.4-linux-x64.tar.xz && \
    unxz node-v8.11.4-linux-x64.tar.xz && \
    tar -xf node-v8.11.4-linux-x64.tar && \
    mv node-v8.11.4-linux-x64 node8

CMD sleep infinity
