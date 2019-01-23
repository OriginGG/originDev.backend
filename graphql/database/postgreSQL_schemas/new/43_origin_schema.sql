begin;

alter sequence origin.blogs_id_seq restart with 10000;
alter sequence origin.combined_roster_individuals_id_seq restart with 10000;
alter sequence origin.combined_rosters_id_seq restart with 10000;
alter sequence origin.content_team_id_seq restart with 10000;
alter sequence origin.domain_registration_id_seq restart with 10000;
alter sequence origin.individual_users_id_seq restart with 10000;
alter sequence origin.org_sponsors_id_seq restart with 10000;
alter sequence origin.organisation_account_id_seq restart with 10000;
alter sequence origin.organisation_members_id_seq restart with 10000;
alter sequence origin.pages_id_seq restart with 10000;
alter sequence origin.pre_users_id_seq restart with 10000;
alter sequence origin.recentmatches_id_seq restart with 10000;
alter sequence origin.roster_individuals_id_seq restart with 10000;
alter sequence origin.rosters_id_seq restart with 10000;
alter sequence origin.sponsors_id_seq restart with 10000;
alter sequence origin.staff_id_seq restart with 10000;
alter sequence origin.staff_individuals_id_seq restart with 10000;
alter sequence origin.stripe_customers_id_seq restart with 10000;
alter sequence origin.themes_id_seq restart with 10000;
alter sequence origin.twitch_channels_id_seq restart with 10000;
alter sequence origin.users_id_seq restart with 10000;
alter sequence origin.youtube_channels_id_seq restart with 10000;
grant usage on sequence origin.themes_id_seq to origin_anonymous, origin_user, origin_admin;



commit;