begin;


create function origin.set_updated_at() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;

create trigger user_updated_at before update
  on origin.users
  for each row
  execute procedure origin.set_updated_at();

create trigger org_updated_at before update
  on origin.organisation_account
  for each row
  execute procedure origin.set_updated_at();

commit;