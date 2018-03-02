FROM node:alpine
MAINTAINER E Rasche <hxr@hx42.org>

RUN apk update && \
    apk add postgresql-client && \
    apk add postgresql && \
    
    npm install -g postgraphile
USER nobody

ADD run.sh /run.sh
ENTRYPOINT ["/run.sh"]
