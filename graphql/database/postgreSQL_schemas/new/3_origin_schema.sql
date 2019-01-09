begin;

grant select, insert, update, delete on table origin.rosters to origin_anonymous, origin_user, origin_admin;
grant select, insert, update, delete on table origin.roster_individuals to origin_anonymous, origin_user, origin_admin;

grant usage on sequence origin.rosters_id_seq to origin_anonymous, origin_user, origin_admin;
grant usage on sequence origin.roster_individuals_id_seq to origin_anonymous, origin_user, origin_admin;

commit;