#!/usr/bin/env python3

import os
import sys
import datetime

DB_NAME = 'originGGNew'
DB_USER = 'origin'
DB_PASSWORD = '\"allegro1234\"'
DB_HOST_PROD = 'origin-production-small.cjdraitfnk0j.us-east-1.rds.amazonaws.com'
DB_HOST_DEV = 'origin-small-dev.cjdraitfnk0j.us-east-1.rds.amazonaws.com'
DB_URL_PROD = 'postgresql://' + DB_USER + ':' + DB_PASSWORD + '@' + DB_HOST_PROD + '/' + DB_NAME
DB_URL_DEV = 'postgresql://' + DB_USER + ':' + DB_PASSWORD + '@' + DB_HOST_DEV + '/' + DB_NAME
DUMP_CMD = 'pg_dump --dbname=' + DB_URL_PROD
COPY_CMD = 'psql --dbname=' + DB_URL_DEV
DROP_DB = 'PGPASSWORD=' + DB_PASSWORD + ' dropdb -h' + DB_HOST_DEV + ' -U' + DB_USER + ' ' + DB_NAME
CREATE_DB = 'PGPASSWORD=' + DB_PASSWORD + ' createdb -h' + DB_HOST_DEV + ' -U' + DB_USER + ' ' + DB_NAME

def main ():
    timestamp = datetime.datetime.now().isoformat()
    path = os.path.dirname(sys.argv[0]) 
    filename = timestamp + '-originGG-prod-dump'
    filepath = path + '/migrations/prod/' + filename
    command = DUMP_CMD + ' > ' + filepath
    print('Dumping DB')
    os.system(command)

    os.system(DROP_DB)
    os.system(CREATE_DB)

    command = COPY_CMD + ' < ' + filepath
    print('Copying Dump:')
    os.system(command)

    print('Success copying the db')
    

if __name__ == '__main__':
    main()