#!/usr/bin/env bash

cd /opt/plat/platform

git pull
npm install
rm -f package-lock.json
systemctl stop engineerman-worker@{1..4}
systemctl start engineerman-worker@{1..4}
