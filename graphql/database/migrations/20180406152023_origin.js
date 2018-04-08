exports.up = function (knex, Promise) {
    return Promise.all([
        knex.raw('create schema origin;'),
        knex.schema
            .withSchema('origin')
            .createTable('organisation_account', table => {
                table.primary('sub_domain');
                table.timestamps(true, true);
                table.string('sub_domain').unique();
                table.string('theme_id')
                table.string('name');
                table.string('company_store_link');
                table.string('description');
                table.string('fb_link');
                table.string('insta_link');
                table.string('twitter_link');
                table.string('twitch_link');
                table.string('logo');
                table.string('primary_color');
                table.string('twitter_feed_username');
            }),
        knex.schema.withSchema('origin').createTable('users', table => {
            table.increments();
            table.timestamps(true, true);
            table.string('first_name');
            table.string('last_name');
            table
                .string('email')
                .notNull()
                .unique();
            table.string('password_hash').notNull();
            table
                .string('organisation')
                .references('sub_domain')
                .inTable('origin.organisation_account');
            table.boolean('admin_user').defaultTo(false);
        }),
        knex.schema.withSchema('origin').createTable('pre_users', table => {
            table.increments();
            table.timestamps(true, true);
            table.string('name');
            table
                .string('email')
                .notNull()
                .unique();
            table.string('password').notNull();
            table.boolean('admin_user').defaultTo(false);
        }),
        knex.schema.withSchema('origin').createTable('themes', table => {
            table.string('theme_name').primary().unique()
                .references('sub_domain')
                .inTable('origin.organisation_account');
            table.jsonb('theme_data');
            table.jsonb('theme_structure');
            table.timestamps(true, true);
        }),
        knex.schema.withSchema('origin').createTable('recentmatches', table => {
            table.increments();
            table
                .string('organisation')
                .references('sub_domain')
                .inTable('origin.organisation_account');
            table.string('opposite_team_name');
            table.string('opposite_team_logo');
            table.string('game_name');
            table.string('game_logo');
            table.string('score');
            table.timestamps(true, true);

        }),
        knex.schema.withSchema('origin').createTable('blogs', table => {
            table.increments();
            table
                .string('organisation')
                .references('sub_domain')
                .inTable('origin.organisation_account');
            table.string('blog_title');
            table.text('blog_content');
            table.string('blog_media');
            table.timestamps(true, true);
            table.boolean('featured').defaultTo(false);
        }),
        knex.schema.withSchema('origin').createTable('twitch_channels', table => {
            table.increments();
            table
                .string('organisation')
                .references('sub_domain')
                .inTable('origin.organisation_account');
            table.string('channel_name');
            table.timestamps(true, true);
        }),
        knex.schema.withSchema('origin').createTable('youtube_channels', table => {
            table.increments();
            table
                .string('organisation')
                .references('sub_domain')
                .inTable('origin.organisation_account');
            table.string('youtube_video_1');
            table.string('youtube_video_2');
            table.string('youtube_video_3');
            table.string('youtube_video_4');
            table.timestamps(true, true);
        }),
        knex.schema.withSchema('origin').createTable('sponsors', table => {
            table.increments();
            table
                .string('organisation')
                .references('sub_domain')
                .inTable('origin.organisation_account');
            table.string('sponsor1');
            table.string('sponsor2');
            table.string('sponsor3');
            table.string('sponsor4');
            table.timestamps(true, true);
        }),
        knex.schema.withSchema('origin').createTable('pages', table => {
            table.increments();
            table
                .string('organisation')
                .references('sub_domain')
                .inTable('origin.organisation_account');
            table.string('page_title');
            table.string('page_key');
            table.text('page_content');
            table.string('page_subtitle');
            table.timestamps(true, true);
        })

    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.withSchema('origin').dropTable('pages'),
        knex.schema.withSchema('origin').dropTable('sponsors'),
        knex.schema.withSchema('origin').dropTable('youtube_channels'),
        knex.schema.withSchema('origin').dropTable('twitch_channels'),
        knex.schema.withSchema('origin').dropTable('blogs'),
        knex.schema.withSchema('origin').dropTable('recentmatches'),
        knex.schema.withSchema('origin').dropTable('themes'),
        knex.schema.withSchema('origin').dropTable('pre_users'),
        knex.schema.withSchema('origin').dropTable('users'),
        knex.schema.withSchema('origin').dropTable('organisation_account'),
        knex.raw('drop schema origin;'),




    ]);
};
