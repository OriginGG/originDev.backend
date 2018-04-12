#!/bin/sh
rsync -avz -e "ssh -i stefan.pem" --exclude 'node_modules' ./api ubuntu@184.73.219.177:~/applications
rsync -avz -e "ssh -i stefan.pem" --exclude 'node_modules' ./api/.env.production ubuntu@184.73.219.177:~/applications/api/.env

ssh -i stefan.pem ubuntu@184.73.219.177 <<'ENDSSH'
cd applications/api
pm2 restart server.js
ENDSSH
