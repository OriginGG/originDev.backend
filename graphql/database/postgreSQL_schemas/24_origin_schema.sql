begin;

drop policy users_ind_new_security on origin.individual_users;

create policy users_ind_new_security on origin.individual_users to origin_user,  origin_admin
  using(
    current_setting('jwt.claims.role')::text = 'origin_admin' OR
    current_setting('jwt.claims.role')::text = 'origin_anonymous' OR
    current_setting('jwt.claims.role')::text = 'origin_user' OR
    id = current_setting('jwt.claims.id')::integer
  ); 
commit;