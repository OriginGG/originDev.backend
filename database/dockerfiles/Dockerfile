FROM node:alpine
RUN apk update && \
    apk add postgresql-client && \
    apk add postgresql && \
    
    npm install -g postgraphile

EXPOSE 5000
USER nobody

ADD run.sh /run.sh
ENTRYPOINT ["/run.sh"]
