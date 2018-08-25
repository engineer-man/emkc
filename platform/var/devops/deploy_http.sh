#!/usr/bin/env bash

cd /opt/plat/platform

git pull
systemctl stop engineerman-platform
cd migrations
bmig migrate
cd ..
npm install
rm -f package-lock.json
systemctl start engineerman-platform
