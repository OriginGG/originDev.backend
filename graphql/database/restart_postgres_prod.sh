#!/usr/bin/env bash
ssh -i "stefan.pem" ubuntu@35.168.193.181 <<'ENDSSH'
docker restart graphql-prod-container
ENDSSH
