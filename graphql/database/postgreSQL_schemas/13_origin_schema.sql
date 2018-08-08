begin;

grant select, insert, update, delete on table origin.content_team to origin_anonymous, origin_user, origin_admin;



commit;