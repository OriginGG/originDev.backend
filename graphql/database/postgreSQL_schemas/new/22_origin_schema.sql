begin;

drop policy IF EXISTS users_new_security on origin.users;

create policy users_new_security on origin.users to origin_user,  origin_admin
  using(id = current_setting('jwt.claims.id')::integer);
commit;