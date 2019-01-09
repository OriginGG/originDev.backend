begin;

drop function if exists origin.register_user(
  first_name text,
  last_name text,
  email text,
  password text,
  admin_user boolean
);


create or replace function origin.register_user(
  first_name text,
  last_name text,
  email text,
  password text,
  admin_user boolean,
  authenticated boolean
) returns origin.users as $$
declare
  person origin.users;
begin
  insert into origin.users (first_name, last_name, organisation_id, email, password_hash, admin_user, authenticated) values
    (first_name, last_name, null, email, crypt(password, gen_salt('bf')), admin_user, authenticated)
    returning * into person;
  return person;
end;
$$ language plpgsql strict security definer;



grant execute on function origin.register_user(text, text, text, text, boolean, boolean) to origin_anonymous;


commit;