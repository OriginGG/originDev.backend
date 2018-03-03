FROM node:alpine
MAINTAINER E Rasche <hxr@hx42.org>

RUN apk update && npm install -g postgraphql
USER nobody

ADD run.sh /run.sh
ENTRYPOINT ["/run.sh"]
