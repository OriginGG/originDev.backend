#!/bin/sh


postgraphile \
	-c postgres://origin_postgraphql:allegro1234@origingg.cjdraitfnk0j.us-east-1.rds.amazonaws.com:5432/originGG \
	-s origin \
	--port 5000 \
	--host 0.0.0.0 \
    --default-role origin_anonymous \
    --jwt-secret OPZY0VVSCAQ3MBFYN9WI04UVNUA7ANU5LQBDQNW2D5USXLZWN3ML7VZCACPF0ZD0 \
    --token origin.jwt_token \
    -o 