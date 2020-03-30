#!/usr/bin/env bash

docker service create --replicas 1 --name notification-service -l=apiRoute='/notification' -p 3004:3000 --env-file env rookiehome/notification-service

# docker run --name notification-service -l=apiRoute='/notification' -p 3004:3000 --env-file env -d notification-service

# docker service create --replicas 1 --name notification-service -l=apiRoute='/notification' -p 3004:3000 --env-file env --env-file env2 crizstian/notification-service
