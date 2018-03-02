FROM node:8-alpine

RUN npm install -g postgraphile

EXPOSE 5000

ADD run.sh /run.sh
ENTRYPOINT ["/run.sh"]
