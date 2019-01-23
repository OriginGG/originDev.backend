#!/bin/sh
ECHO Dropping and creating new organisation migrate DB.
sh ./drop_new_org_db.sh
ECHO Creating tables and schema
node ./graphql/database/organisations_migrate.js
ECHO Creating postgraphile functions and types
cd graphql/database
knex-migrate up --env=config_new
ECHO restarting postgraphile api
sh ./restart_postgres.sh 
cd ../..
