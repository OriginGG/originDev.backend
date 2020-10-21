ECHO Dropping and creating new DB.
sh ./drop_db.sh
ECHO Creating tables and schema.
knex-migrate up
ECHO Injecting dummy data into DB.
knex seed:run
ECHO Complete...