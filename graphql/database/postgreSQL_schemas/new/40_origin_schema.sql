begin;

alter table origin.users disable row level security;

revoke select, insert, delete, update on table origin.users from origin_anonymous, origin_user, origin_admin;

grant select (
    id,
    first_name, 
    last_name, 
    email, 
    organisation_id,
    created_at, 
    updated_at, 
    admin_user,
    authenticated,
    subscribed
) on table origin.users to origin_anonymous;

grant select (
    id,
    first_name, 
    last_name, 
    email, 
    organisation_id,
    created_at, 
    updated_at, 
    admin_user,
    authenticated,
    subscribed,
    password_hash
) on table origin.users to origin_user, origin_admin;

grant delete on table origin.users to origin_user, origin_admin;
grant insert (
    id,
    first_name, 
    last_name, 
    email, 
    organisation_id,
    created_at, 
    updated_at, 
    admin_user,
    authenticated,
    subscribed,
    password_hash
) on table origin.users to origin_anonymous, origin_user, origin_admin;

grant update (
    id,
    first_name, 
    last_name, 
    email, 
    organisation_id,
    created_at, 
    updated_at, 
    admin_user,
    authenticated,
    subscribed,
    password_hash
) on table origin.users to origin_user, origin_admin;




commit;