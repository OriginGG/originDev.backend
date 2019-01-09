begin;


grant select, insert, update, delete on table origin.org_sponsors_id_seq to origin_anonymous, origin_user, origin_admin;


commit;