#!/usr/bin/env bash
detached=-d
if [ $# -ne 0 ]
then unset detached
fi
docker stop postgraphql
docker rm postgraphql
docker rm $(docker ps -a -q)
docker rmi $(docker images --quiet --filter "dangling=true")
docker build -t postgraphql_image ./dockerfiles
docker run --name postgraphql --restart=always ${detached} -p 5000:5000 postgraphql_image
