#!/usr/bin/env bash

apt update && apt full-upgrade -y

# TODO install node

npm install -g pm2
pm2 update
