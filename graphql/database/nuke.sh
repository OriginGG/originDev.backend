ECHO Dropping and creating new DB.
sh ./drop_db.sh
ECHO Creating tables and schema.
knex migrate:latest  --knexfile ./knex.js
ECHO Injecting dummy data into DB.
knex seed:run --knexfile ./knex.js
ECHO Complete...