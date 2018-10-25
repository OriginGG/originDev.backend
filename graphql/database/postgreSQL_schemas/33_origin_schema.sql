begin;


grant select on table origin.individual_users to origin_anonymous;
grant select, insert, update, delete on table origin.individual_users to origin_individual_user, origin_user, origin_admin;

commit;
