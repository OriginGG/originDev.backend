begin;

comment on column origin.individual_users.password_hash is '';

revoke select on table origin.individual_users from origin_anonymous, origin_user, origin_admin;
grant select (
    first_name, 
    last_name, 
    email, 
    about, 
    contact_number, 
    id, 
    created_at, 
    updated_at, 
    accomplishments,
    twitch_url, 
    twitter_handle, 
    youtube_channel, 
    youtube_video1_url, 
    youtube_video2_url, 
    youtube_video3_url,
    banner_image_url, 
    profile_image_url,
    username,
    instagram_link,
    facebook_link,
    authenticated,
    twitch_user_id 
) on table origin.individual_users to origin_anonymous;

grant select (
    first_name, 
    last_name, 
    email, 
    about, 
    contact_number, 
    id, 
    created_at, 
    updated_at, 
    accomplishments,
    password_hash,
    twitch_url, 
    twitter_handle, 
    youtube_channel, 
    youtube_video1_url, 
    youtube_video2_url, 
    youtube_video3_url,
    banner_image_url, 
    profile_image_url,
    username,
    instagram_link,
    facebook_link,
    authenticated,
    twitch_user_id 
) on table origin.individual_users to origin_user, origin_admin, origin_individual_user;
grant delete on table origin.individual_users to origin_user, origin_admin, origin_individual_user;
grant insert (
    first_name, 
    last_name, 
    email, 
    about, 
    contact_number, 
    id, 
    created_at, 
    updated_at, 
    accomplishments,
    password_hash,
    twitch_url, 
    twitter_handle, 
    youtube_channel, 
    youtube_video1_url, 
    youtube_video2_url, 
    youtube_video3_url,
    banner_image_url, 
    profile_image_url,
    username,
    instagram_link,
    facebook_link,
    authenticated,
    twitch_user_id 
) on table origin.individual_users to origin_user, origin_admin, origin_individual_user;

grant update (
    first_name, 
    last_name, 
    email, 
    about, 
    contact_number, 
    id, 
    created_at, 
    updated_at, 
    accomplishments,
    password_hash,
    twitch_url, 
    twitter_handle, 
    youtube_channel, 
    youtube_video1_url, 
    youtube_video2_url, 
    youtube_video3_url,
    banner_image_url, 
    profile_image_url,
    username,
    instagram_link,
    facebook_link,
    authenticated,
    twitch_user_id 
) on table origin.individual_users to origin_user, origin_admin, origin_individual_user;



grant usage on sequence origin.individual_users_id_seq to origin_user, origin_admin, origin_individual_user;


commit;