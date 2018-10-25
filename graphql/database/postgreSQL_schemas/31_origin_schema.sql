begin;


alter table origin.individual_users enable row level security;

create policy users_ind_new_security on origin.individual_users to origin_user,  origin_admin
  using(
    current_setting('jwt.claims.role')::text = 'origin_admin' OR
    current_setting('jwt.claims.role')::text = 'origin_user' OR
    id = current_setting('jwt.claims.id')::integer
  ); 
commit;