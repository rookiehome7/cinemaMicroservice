#!/usr/bin/env bash

docker service create --replicas 1 --name movies-service -l=apiRoute='/movies' -p 3000:3000 rookiehome/movies-service

# docker run --name movies-service -l=apiRoute='/movies' -p 3000:3000 -d rookiehome/movies-service


# docker run --name movies-service -p 3000:3000 -e DB_SERVERS="192.168.99.113:27017 192.168.99.114:27017 192.168.99.115:27017" -d movies-service
