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


DO $$
BEGIN
		IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_admin') THEN
        CREATE ROLE origin_admin;
    END IF;
		IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_user') THEN
        CREATE ROLE origin_user;
    END IF;
END
$$;


-- Allows Schema Useage for all users

grant usage on schema origin to origin_user, origin_admin;

-- All users can view  person file (this is only temporary to do some testing!!)

grant select on table origin.user to origin_user, origin_admin;
grant update, delete on table origin.user to origin_user, origin_admin;

grant usage on schema origin to origin_admin;
grant select, insert, update, delete on table origin.user to origin_user, origin_admin;

commit;