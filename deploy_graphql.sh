#!/bin/sh
rsync -avz -e "ssh -i stefan.pem" --exclude 'node_modules' ./graphql ubuntu@35.168.193.181:~/applications
rsync -avz -e "ssh -i stefan.pem" ./docker-compose.yml ubuntu@35.168.193.181:~/applications

# ssh -i RLM-Private-NEW.pem ubuntu@54.191.182.21 <<'ENDSSH'
# cd applications/web/rd1_ink
# ./update_web_ink.sh
# ENDSSH
