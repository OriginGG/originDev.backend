begin;


revoke select, insert, update, delete on table origin.recentmatches from origin_anonymous, origin_user, origin_admin;

grant select on table origin.recentmatches to origin_anonymous;
grant select, insert, update, delete on table origin.recentmatches to origin_user, origin_admin;

commit;