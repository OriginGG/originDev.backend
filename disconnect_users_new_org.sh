#!/usr/bin/env bash
export PGPASSWORD=allegro1234
psql -h origin-production-small.cjdraitfnk0j.us-east-1.rds.amazonaws.com -p 5432 -U origin -w -d originGGNew -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE datname = current_database() AND pid <> pg_backend_pid();"