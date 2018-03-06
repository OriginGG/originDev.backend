exports.up = function(knex, Promise) {
    return Promise.all([
        knex.raw('create schema origin;'),
        knex.schema
            .withSchema('origin')
            .createTable('organisation_account', table => {
                table.primary('sub_domain');
                table.timestamps(true, true);
                table.string('sub_domain').unique();
                table.string('name');
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
      knex.schema.withSchema('origin').createTable('themes', table => {
          table.string('theme_name').primary().unique()
              .references('sub_domain')
              .inTable('origin.organisation_account');
            table.text('theme_data');
            table.timestamps(true, true);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([knex.schema.withSchema('origin').dropTable('user')]);
};
