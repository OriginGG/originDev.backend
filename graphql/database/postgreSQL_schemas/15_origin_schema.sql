begin;


grant select, insert, update, delete on table origin.org_sponsors to origin_anonymous, origin_user, origin_admin;


commit;