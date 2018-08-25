#!/usr/bin/env bash

cd /opt/plat/platform

git pull
systemctl stop engineerman-worker@{1..4}
npm install
rm -f package-lock.json
systemctl start engineerman-worker@{1..4}
