#!/usr/bin/env bash

docker service create --replicas 1 --name payment-service -l=apiRoute='/payment' -p 3003:3000 --env-file env rookiehome/payment-service

# docker run --name payment-service -l=apiRoute='/payment' -p 3003:3000 --env-file env -d crizstian/payment-service