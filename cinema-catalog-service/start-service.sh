#!/usr/bin/env bash

# docker run --name catalog-service -p 3000:3000 --env-file env -d rookiehome/cinema-catalog-service

docker service create --replicas 1 --name cinema-catalog-service -l=apiRoute='/cinemas' -p 3001:3000 --env-file env rookiehome/cinema-catalog-service

