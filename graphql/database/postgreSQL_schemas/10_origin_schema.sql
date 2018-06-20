begin;

grant select, insert, update, delete on table origin.organisation_members to origin_anonymous, origin_user, origin_admin;

grant usage on sequence origin.organisation_members_id_seq to origin_anonymous, origin_user, origin_admin;

commit;