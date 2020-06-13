#!/usr/bin/env bash

cd /home/ubuntu/Personal-Website || exit
pm2 stop "Personal Website" || true
