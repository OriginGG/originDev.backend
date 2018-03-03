#!/usr/bin/env bash
detached=-d
if [ $# -ne 0 ]
then unset detached
fi
docker stop postgraphql
docker rm postgraphql
docker rm $(docker ps -a -q)
docker rmi $(docker images --quiet --filter "dangling=true")
docker build -t postgraphql_image ./dockerfiles
docker run --net=backend --name postgraphql --restart=always ${detached} -p 5000:5000 \
-e VIRTUAL_HOST=api.originapi.com \
-e DB_GRAPHIQL_PATH="/graphiql" \
-e PG_SECRET="deadbeefcafe" \
-e DB_SCHEMA="origin" \
-e PGUSER=origin_postgraphql \
-e PGPASSWORD=allegro1234 \
-e PGHOST=origingg.cjdraitfnk0j.us-east-1.rds.amazonaws.com \
-e PGDATABASE=originGG \
-e PGJWTSECRET=bbo9Q4jsIkfQ1gkpolQAKLXO4WZ-s3SEcvo3gHwfxCEM_IBSisDWzlwcmDKjVfH0 \
-e PGTOKEN=origin.jwt_token \
-e PGDEFAULTROLE=origin_anonymous \
-e PGPORT=5432 \
-e PGSECRET=bbo9Q4jsIkfQ1gkpolQAKLXO4WZ-s3SEcvo3gHwfxCEM_IBSisDWzlwcmDKjVfH0c \
-e GQL_PORT=5000 postgraphql_image
