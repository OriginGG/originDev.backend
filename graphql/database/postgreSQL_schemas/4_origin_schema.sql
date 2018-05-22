begin;

drop function if exists origin.authenticate_individual(
  email text,
  password text
);

drop function if exists origin.register_user(
  first_name text,
  last_name text,
  email text,
  password text,
  admin_user boolean
);

drop function if exists origin.individual_user_register(
  first_name text,
  last_name text,
  email text,
  password text
);

drop function if exists origin.individual_user_register(
  first_name text,
  last_name text,
  email text,
  password text,
  authenticated boolean,
  user_name text
);


DROP TYPE IF EXISTS origin.individual_auth_payload;
DROP TYPE IF EXISTS individual_auth_account;

create type individual_auth_account as (
    id integer,
    password_hash text,
    email text,
    authenticated boolean
);

create type origin.individual_auth_payload as (
  jwt_token origin.jwt_token,
  user_id integer,
  authenticated boolean
);

create or replace function origin.authenticate_individual(
  email text,
  password text
) returns origin.individual_auth_payload as $$
declare
  account individual_auth_account;
begin
  select a.id, a.password_hash, a.email, a.authenticated into account 
  from origin.individual_users as a
  where a.email = $1;
  if account.password_hash = crypt(password, account.password_hash) then
    	return (('origin_individual_user', account.id, account.email)::origin.jwt_token, account.id, account.authenticated);
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


create or replace function origin.individual_user_register(
  first_name text,
  last_name text,
  email text,
  password text,
  authenticated boolean,
  user_name text
) returns origin.individual_users as $$
declare
  person origin.individual_users;
begin
  insert into origin.individual_users (first_name, last_name, email, password_hash, authenticated, username) values
    (first_name, last_name, email, crypt(password, gen_salt('bf')), authenticated, user_name)
    returning * into person;
  return person;
end;
$$ language plpgsql strict security definer;


grant execute on function origin.register_user(text, text, text, text, boolean) to origin_anonymous;

grant execute on function origin.individual_user_register(text, text, text, text, boolean, text) to origin_anonymous;



commit;