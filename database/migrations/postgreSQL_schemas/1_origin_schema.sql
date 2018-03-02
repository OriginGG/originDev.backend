-- This file was automatically generated from the `TUTORIAL.md` which
-- contains a complete explanation of how this schema works and why certain
-- decisions were made. If you are looking for a comprehensive tutorial,
-- definetly check it out as this file is a little tough to read.
--
-- If you want to contribute to this file, please change the
-- `TUTORIAL.md` file and then rebuild this file :)

begin;

create extension if not exists "pgcrypto";
-- create a function to see if person already exists.

create type origin.jwt_token as (
  role text,
  user_id integer
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_postgraphql') THEN
        CREATE ROLE origin_postgraphql LOGIN PASSWORD 'allegro1234';
    END IF;
	IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_anonymous') THEN
        CREATE ROLE origin_anonymous;
    END IF;		IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_admin') THEN
        CREATE ROLE origin_admin;
    END IF;
	IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_user') THEN
        CREATE ROLE origin_user;
    END IF;
END
$$;


-- Allows Schema Useage for all users

grant origin_admin to origin_postgraphql;
grant origin_user to origin_postgraphql;
grant origin_anonymous to origin_postgraphql;

grant usage on schema origin to origin_anonymous, origin_user, origin_admin;

-- All users can view  person file (this is only temporary to do some testing!!)


grant select, insert, update, delete on table origin.user to origin_anonymous, origin_user, origin_admin;

commit;