begin;

grant select, insert, update, delete on table origin.registration_emails to origin_anonymous, origin_user, origin_admin;


commit;