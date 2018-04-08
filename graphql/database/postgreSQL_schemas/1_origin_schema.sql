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
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_postgraphql') THEN
        CREATE ROLE origin_postgraphql LOGIN PASSWORD 'allegro1234';
    END IF;
	IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_anonymous') THEN
        CREATE ROLE origin_anonymous;
    END IF;		
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_admin') THEN
        CREATE ROLE origin_admin;
    END IF;
	IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'origin_user') THEN
        CREATE ROLE origin_user;
    END IF;
END
$$;

create type origin.jwt_token as (
  role text,
  id integer,
  organisation text
);

create type origin.pre_jwt_token as (
  role text,
  id integer,
  email text
);


create type auth_account as (
    id integer,
    admin_user boolean,
    password_hash text,
    email text,
    organisation text
);

create type origin.auth_payload as (
  jwt_token origin.jwt_token,
  user_id integer,
  organisation text,
  is_admin boolean
);
create function origin.hash_password(
  password text
) returns text as $$
begin
  return crypt(password, gen_salt('bf'));
end;
$$ language plpgsql strict security definer;

create function origin.authenticate(
  email text,
  password text
) returns origin.auth_payload as $$
declare
  account auth_account;
begin
  select a.id, a.admin_user, a.password_hash, a.email, a.organisation into account 
  from origin.users as a
  where a.email = $1;
  if account.password_hash = crypt(password, account.password_hash) then
		if account.admin_user = false then
    	return (('origin_user', account.id, account.organisation)::origin.jwt_token, account.id, account.organisation, false);
		else 
    	return (('origin_admin', account.id, account.organisation)::origin.jwt_token,  account.id, account.organisation, true);
		end if;
	else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

create function origin.register_user(
  first_name text,
  last_name text,
  email text,
  password text,
  admin_user boolean
) returns origin.users as $$
declare
  person origin.users;
begin
  insert into origin.users (first_name, last_name, organisation, email, password_hash, admin_user) values
    (first_name, last_name, null, email, crypt(password, gen_salt('bf')), admin_user)
    returning * into person;
  return person;
end;
$$ language plpgsql strict security definer;

create function origin.pre_register_user(
  name text,
  email text,
  password text,
  admin_user boolean
) returns jwt_token as $$
declare
  person origin.pre_users;
begin
  insert into origin.pre_users (name, email, password, admin_user) values
    (name, email, password, admin_user)
    returning * into person;
  return ('origin_anonymous', person.id, person.email)::origin.pre_jwt_token;
end;
$$ language plpgsql strict security definer;


create type pre_auth_account as (
    id integer,
    password text,
    email text
);

create or replace function origin.pre_user_authenticate(
  email text,
  password text
) returns jwt_token as $$
declare
  account pre_auth_account;
begin
  select a.id, a.password, a.email into account 
  from origin.pre_users as a
  where a.email = $1 AND a.password = $2;
  if account.id > 0 then
    return ('origin_anonymous', account.id, account.email)::origin.pre_jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

-- Allows Schema Useage for all users

grant origin_admin to origin_postgraphql;
grant origin_user to origin_postgraphql;
grant origin_anonymous to origin_postgraphql;

grant usage on schema origin to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.organisation_account to origin_anonymous, origin_user, origin_admin;

-- All users can view  person file (this is only temporary to do some testing!!)

grant execute on function origin.register_user(text, text, text, text, boolean) to origin_anonymous;
grant execute on function origin.pre_register_user(text, text, text, boolean) to origin_anonymous;
grant execute on function origin.pre_user_authenticate(text, text) to origin_anonymous;


grant select, insert, update, delete on table origin.users to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.pre_users to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.themes to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.recentmatches to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.blogs to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.pages to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.youtube_channels to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.twitch_channels to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.sponsors to origin_anonymous, origin_user, origin_admin;

grant execute on function origin.authenticate(text, text) to origin_anonymous, origin_user;
grant execute on function origin.hash_password(text) to origin_anonymous, origin_user;

grant usage on sequence origin.blogs_id_seq to origin_anonymous, origin_user, origin_admin;
grant usage on sequence origin.pages_id_seq to origin_anonymous, origin_user, origin_admin;
grant usage on sequence origin.youtube_channels_id_seq to origin_user, origin_admin;
grant usage on sequence origin.sponsors_id_seq to origin_anonymous, origin_user, origin_admin;
grant usage on sequence origin.recentmatches_id_seq to origin_user, origin_admin;

-- alter table origin.blogs enable row level security;
-- alter table origin.youtube_channels enable row level security;
-- alter table origin.twitch_channels enable row level security;
-- alter table origin.sponsors enable row level security;

-- create policy blogs_security on origin.blogs to origin_user,  origin_admin
--   using(organisation = current_setting('jwt.claims.organisation')::text);

-- create policy youtube_channels_security on origin.youtube_channels to origin_user,  origin_admin
--   using(organisation = current_setting('jwt.claims.organisation')::text);

-- create policy twitch_channels_security on origin.twitch_channels to origin_user,  origin_admin
--   using(organisation = current_setting('jwt.claims.organisation')::text);

-- create policy sponsors_security on origin.sponsors to origin_user,  origin_admin
--   using(organisation = current_setting('jwt.claims.organisation')::text);

commit;