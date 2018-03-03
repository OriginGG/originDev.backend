#!/usr/bin/env bash
detached=-d
if [ $# -ne 0 ]
then unset detached
fi
docker stop nginx_proxy
docker rm nginx_proxy
docker rm $(docker ps -a -q)
docker rmi $(docker images --quiet --filter "dangling=true")
docker run --net=backend --name nginx_proxy --restart=always ${detached} -p 80:80 -p 443:443 -v ~/applications/hub/my_proxy.conf:/etc/nginx/conf.d/my_proxy.conf:ro -v /var/run/docker.sock:/tmp/docker.sock:ro -v ~/applications/hub/bootstrap/certs:/etc/nginx/certs jwilder/nginx-proxy

