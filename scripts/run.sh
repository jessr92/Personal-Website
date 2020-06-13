#!/usr/bin/env bash

if [ -n "$DEPLOYMENT_GROUP_NAME" ]; then
 export NODE_ENV=$DEPLOYMENT_GROUP_NAME
fi

cd /home/ubuntu/Personal-Website || exit
pm2 delete "Personal Website"
pm2 start npm --no-automation --name "Personal Website" -- run prod
pm2 save