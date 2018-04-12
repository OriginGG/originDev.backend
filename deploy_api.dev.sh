#!/bin/sh
rsync -avz -e "ssh -i stefan.pem" --exclude 'node_modules' ./api ubuntu@35.170.143.234:~/applications
rsync -avz -e "ssh -i stefan.pem" --exclude 'node_modules' ./api/.env.development ubuntu@35.170.143.234:~/applications/api/.env

ssh -i stefan.pem ubuntu@35.170.143.234 <<'ENDSSH'
cd applications/api
pm2 restart server.js
ENDSSH
