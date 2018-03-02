#!/bin/sh


postgraphql \
	-c postgres://origin_postgraphql:allegro1234@origingg.cjdraitfnk0j.us-east-1.rds.amazonaws.com:5432/originGG \
	-s origin \
	--port 5000 \
	--host 0.0.0.0 \
    --default-role origin_anonymous \
    --jwt-secret bbo9Q4jsIkfQ1gkpolQAKLXO4WZ-s3SEcvo3gHwfxCEM_IBSisDWzlwcmDKjVfH0 \
    --token origin.jwt_token \
    -o \
    --secret bbo9Q4jsIkfQ1gkpolQAKLXO4WZ-s3SEcvo3gHwfxCEM_IBSisDWzlwcmDKjVfH0
