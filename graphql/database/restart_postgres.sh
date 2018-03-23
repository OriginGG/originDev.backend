#!/usr/bin/env bash
ssh -i "stefan.pem" ubuntu@ec2-52-86-203-150.compute-1.amazonaws.com <<'ENDSSH'
docker restart graphql-container
ENDSSH
