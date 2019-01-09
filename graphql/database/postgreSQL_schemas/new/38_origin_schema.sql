begin;


revoke select, insert, update, delete on table origin.pages from origin_anonymous, origin_user, origin_admin;

grant select on table origin.pages to origin_anonymous;
grant select, insert, update, delete on table origin.pages to origin_user, origin_admin;

commit;