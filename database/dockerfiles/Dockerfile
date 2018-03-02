FROM node:8-alpine

RUN npm install -g postgraphile

EXPOSE 5000
USER nobody

ADD run.sh /run.sh
ENTRYPOINT ["/run.sh"]
