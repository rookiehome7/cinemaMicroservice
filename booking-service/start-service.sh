#!/usr/bin/env bash

docker service create --replicas 1 --name booking-service -l=apiRoute='/booking' -p 3002:3000 --env-file env rookiehome/booking-service

# docker run --name booking-service -l=apiRoute='/booking' -p 3002:3000 --env-file env -d crizstian/booking-service


# docker run --name booking-service -l=apiRoute='/booking' -p 3002:3000 --env-file env -d booking-service
