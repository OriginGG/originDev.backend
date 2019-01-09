begin;

drop function if exists origin.set_password_organisation(
  id integer,
  password text
);
drop function if exists origin.set_password_individual(
  id integer,
  password text
);
create or replace function origin.set_password_organisation(
  id integer,
  password text
) returns boolean as $$
begin
    UPDATE origin.users
    SET password_hash = crypt($2, gen_salt('bf'))
    WHERE origin.users.id = $1;
    return true;
end;
$$ language plpgsql strict security definer;

create or replace function origin.set_password_individual(
  id integer,
  password text
) returns boolean as $$
begin
    UPDATE origin.individual_users
    SET password_hash = crypt($2, gen_salt('bf'))
    WHERE origin.individual_users.id = $1;
    return true;
end;
$$ language plpgsql strict security definer;
grant execute on function origin.set_password_organisation(integer, text) to origin_anonymous;
grant execute on function origin.set_password_individual(integer, text) to origin_anonymous;


commit;