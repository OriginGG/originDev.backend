#!/bin/sh
rsync -avz -e "ssh -i stefan.pem" --exclude 'node_modules' ./graphql ubuntu@35.168.193.181:~/applications
rsync -avz -e "ssh -i stefan.pem" ./docker-compose.yml ubuntu@35.168.193.181:~/applications
rsync -avz -e "ssh -i stefan.pem" ./graphql/CSR ubuntu@35.168.193.181:~/applications

rsync -avz -e "ssh -i stefan.pem" --exclude 'node_modules' ./api ubuntu@35.168.193.181:~/applications/api_dev
rsync -avz -e "ssh -i stefan.pem" --exclude 'node_modules' ./api ubuntu@35.168.193.181:~/applications/api_prod
rsync -avz -e "ssh -i stefan.pem" ./api/.env.development ubuntu@35.168.193.181:~/applications/api_dev/api/.env
rsync -avz -e "ssh -i stefan.pem" ./api/.env.production ubuntu@35.168.193.181:~/applications/api_prod/api/.env
rsync -avz -e "ssh -i stefan.pem" ./graphql/Dockerfile.api.dev ubuntu@35.168.193.181:~/applications/api_dev
rsync -avz -e "ssh -i stefan.pem" ./graphql/Dockerfile.api.prod ubuntu@35.168.193.181:~/applications/api_prod


# ssh -i RLM-Private-NEW.pem ubuntu@54.191.182.21 <<'ENDSSH'
# cd applications/web/rd1_ink
# ./update_web_ink.sh
# ENDSSH
