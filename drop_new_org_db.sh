#!/usr/bin/env bash
export PGPASSWORD=allegro1234
dropdb --host=origin-production-small.cjdraitfnk0j.us-east-1.rds.amazonaws.com --port=5432  --username=origin --no-password originGGNew
createdb --host=origin-production-small.cjdraitfnk0j.us-east-1.rds.amazonaws.com --port=5432  --username=origin --no-password originGGNew