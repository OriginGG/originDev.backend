-- This file was automatically generated from the `TUTORIAL.md` which
-- contains a complete explanation of how this schema works and why certain
-- decisions were made. If you are looking for a comprehensive tutorial,
-- definetly check it out as this file is a little tough to read.
--
-- If you want to contribute to this file, please change the
-- `TUTORIAL.md` file and then rebuild this file :)

begin;

DO $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_individual_user') THEN
        CREATE ROLE origin_individual_user;
    END IF;
END
$$;
DROP FUNCTION IF EXISTS origin.authenticate_individual(
  email text,
  password text
);
DROP FUNCTION IF EXISTS origin.register_individual_user(
  first_name text,
  last_name text,
  email text,
  password text
);
DROP TYPE IF EXISTS individual_auth_account;
DROP TYPE IF EXISTS origin.individual_auth_payload;
DROP TYPE IF EXISTS origin.individual_jwt_token;


create type individual_auth_account as (
    id integer,
    password_hash text,
    email text
);

create type origin.individual_auth_payload as (
  jwt_token origin.jwt_token,
  user_id integer
);
create or replace function origin.authenticate_individual(
  email text,
  password text
) returns origin.individual_auth_payload as $$
declare
  account individual_auth_account;
begin
  select a.id, a.password_hash, a.email into account 
  from origin.individual_users as a
  where a.email = $1;
  if account.password_hash = crypt(password, account.password_hash) then
    	return (('origin_individual_user', account.id, account.email)::origin.jwt_token, account.id);
	else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

create or replace function origin.individual_user_register(
  first_name text,
  last_name text,
  email text,
  password text
) returns origin.individual_users as $$
declare
  person origin.individual_users;
begin
  insert into origin.individual_users (first_name, last_name, email, password_hash) values
    (first_name, last_name, email, crypt(password, gen_salt('bf')))
    returning * into person;
  return person;
end;
$$ language plpgsql strict security definer;


grant origin_individual_user to origin_postgraphql;

grant usage on schema origin to origin_individual_user;
grant select, insert, update, delete on table origin.individual_users to origin_anonymous, origin_user, origin_admin, origin_individual_user;

-- All users can view  person file (this is only temporary to do some testing!!)

grant execute on function origin.individual_user_register(text, text, text, text) to origin_anonymous;

grant select, insert, update, delete on table origin.individual_users to origin_anonymous, origin_user, origin_admin;

grant execute on function origin.authenticate_individual(text, text) to origin_anonymous, origin_user;

commit;