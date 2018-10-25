begin;


alter table origin.individual_users disable row level security;

revoke select, insert, update, delete on table origin.individual_users from origin_individual_user, origin_anonymous, origin_user, origin_admin;


commit;