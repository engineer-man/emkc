#!/usr/bin/env bash

PATH=/root/deps/node8/bin:$PATH

cd /net/engineerman/platform

git pull
systemctl stop engineerman
cd migrations
bmig migrate
cd ..
npm install
rm -f package-lock.json
systemctl start engineerman
