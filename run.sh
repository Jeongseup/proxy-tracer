#!/bin/env/bash

source .env
docker run -d -p 3000:3000 --env API_URL=${API_URL} --name proxy-server my-proxy-server