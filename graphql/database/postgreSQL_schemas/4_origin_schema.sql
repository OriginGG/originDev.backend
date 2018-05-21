begin;

drop function origin.authenticate_individual(
  email text,
  password text
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

commit;