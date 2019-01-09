begin;


alter table origin.users enable row level security;

-- create policy users_security on origin.users to origin_user,  origin_admin
--   using(organisation = current_setting('jwt.claims.organisation')::text)

commit;