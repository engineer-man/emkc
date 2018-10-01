#!/usr/bin/env bash

PATH=/root/deps/node8/bin:$PATH

cd /net/engineerman/platform

git pull
npm install
rm -f package-lock.json
systemctl stop engineerman
cd migrations
bmig migrate
cd ..
systemctl start engineerman
