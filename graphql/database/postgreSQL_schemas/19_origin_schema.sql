begin;

grant select, insert, update, delete on table origin.combined_rosters to origin_anonymous, origin_user, origin_admin;
grant usage on sequence origin.combined_rosters_id_seq to origin_anonymous, origin_user, origin_admin;

grant select, insert, update, delete on table origin.combined_roster_individuals to origin_anonymous, origin_user, origin_admin;
grant usage on sequence origin.combined_roster_individuals_id_seq to origin_anonymous, origin_user, origin_admin;


commit;