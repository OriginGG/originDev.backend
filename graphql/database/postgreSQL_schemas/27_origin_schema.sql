-- This file was automatically generated from the `TUTORIAL.md` which
-- contains a complete explanation of how this schema works and why certain
-- decisions were made. If you are looking for a comprehensive tutorial,
-- definetly check it out as this file is a little tough to read.
--
-- If you want to contribute to this file, please change the
-- `TUTORIAL.md` file and then rebuild this file :)

begin;

revoke select, insert, update, delete on table origin.individual_users from origin_anonymous, origin_user, origin_admin;

grant select, insert, update, delete on table origin.individual_users to origin_individual_user, origin_anonymous, origin_user, origin_admin;

alter table origin.blogs enable row level security;


create policy blogs_security on origin.blogs to origin_user,  origin_admin
  using(id = current_setting('jwt.claims.id')::integer);
commit;

-- GRANT SELECT, INSERT ( 
--     first_name, 
--     last_name, 
--     email, 
--     about, 
--     contact_number, 
--     id, 
--     created_at, 
--     updated_at, 
--     accomplishments,
--     twitch_url, 
--     twitter_handle, 
--     youtube_channel, 
--     youtube_video1_url, 
--     youtube_video2_url, 
--     youtube_video3_url,
--     banner_image_url, 
--     profile_image_url,
--     username,
--     instagram_link,
--     facebook_link,
--     authenticated,
--     twitch_user_id 
--  ) ON TABLE origin.individual_users to origin_anonymous, origin_user, origin_admin;

-- GRANT INSERT ( 
--     first_name, 
--     last_name, 
--     email, 
--     about, 
--     contact_number, 
--     id, created_at, 
--     updated_at, 
--     accomplishments,
--     twitch_url, 
--     twitter_handle, 
--     youtube_channel, 
--     youtube_video1_url, 
--     youtube_video2_url, 
--     youtube_video3_url,
--     banner_image_url, 
--     profile_image_url,
--     username,
--     instagram_link,
--     facebook_link,
--     authenticated,
--     twitch_user_id 
--  ) ON TABLE origin.individual_users to origin_anonymous, origin_user, origin_admin;

-- GRANT UPDATE ( 
--     first_name, 
--     last_name, 
--     email, 
--     about, 
--     contact_number, 
--     id, created_at, 
--     updated_at, 
--     accomplishments,
--     twitch_url, 
--     twitter_handle, 
--     youtube_channel, 
--     youtube_video1_url, 
--     youtube_video2_url, 
--     youtube_video3_url,
--     banner_image_url, 
--     profile_image_url,
--     username,
--     instagram_link,
--     facebook_link,
--     authenticated,
--     twitch_user_id 
--  ) ON TABLE origin.individual_users to origin_anonymous, origin_user, origin_admin;


commit;