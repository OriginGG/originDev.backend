begin;


revoke select, insert, update, delete on table origin.organisation_account from origin_anonymous, origin_user, origin_admin;

grant select on table origin.organisation_account to origin_anonymous;
grant select, insert, update, delete on table origin.organisation_account to origin_user, origin_admin;

commit;