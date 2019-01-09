begin;

grant select, insert, update, delete on table origin.staff to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.staff_individuals to origin_anonymous, origin_user, origin_admin;

grant usage on sequence origin.staff_id_seq to origin_anonymous, origin_user, origin_admin;
grant usage on sequence origin.staff_individuals_id_seq to origin_anonymous, origin_user, origin_admin;

grant usage on sequence origin.organisation_account_id_seq to origin_anonymous, origin_user, origin_admin;
grant usage on sequence origin.organisation_account_id_seq to origin_anonymous, origin_user, origin_admin;

commit;