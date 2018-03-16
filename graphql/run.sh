#!/bin/sh
postgraphile \
	-c $POSTGRAPHILE_HOST \
	-s $POSTGRAPHILE_SCHEMA_NAME \
	--port 5000 \
	--host 0.0.0.0 \
    --default-role $POSTGRAPHILE_DEFAULT_ROLE \
    --jwt-secret $POSTGRAPHILE_JWT_SECRET \
    --token $POSTGRAPHILE_JWT_TOKEN \
    -o 
