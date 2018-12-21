const environment = 'production'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);
const config_new = require('./knexfile.js')['config_new'];
const knex_new = require('knex')(config_new);


do_migration();


async function do_migration () {
    await migrate_orgs();
    await migrate_blogs();
    await migrate_combined_rosters();
    await migrate_combined_roster_individuals();
    
};

async function migrate_combined_roster_individuals() {
    return new Promise((resolve) => {
        knex_new.schema.hasTable('combined_roster_individuals').then((exists) => {
            knex.from('combined_roster_individuals').select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable('combined_roster_individuals', table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('game_id')
                            table.integer('position_id')
                            table.string('roster_type')
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                            table.string('team_name')
                        })
                    for (let i = 0; i < results.length; i++) {
                        // find the org account;
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].sub_domain);
                        const n = results[i];
                        delete n.sub_domain;
                        n.organisation_id = k[0].id
                        await knex_new('combined_rosters').insert(n);
                        console.log(`Completed ${i + 1} of ${results.length}`);

                    }
                }
                debugger;
                resolve(true);
            });
        });
    })

}


async function migrate_combined_rosters() {
    return new Promise((resolve) => {
        knex_new.schema.hasTable('combined_rosters').then((exists) => {
            knex.from('combined_rosters').select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable('combined_rosters', table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('game_id')
                            table.integer('position_id')
                            table.string('roster_type')
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                            table.string('team_name')
                        })
                    for (let i = 0; i < results.length; i++) {
                        // find the org account;
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].sub_domain);
                        const n = results[i];
                        delete n.sub_domain;
                        n.organisation_id = k[0].id
                        await knex_new('combined_rosters').insert(n);
                        console.log(`Completed ${i + 1} of ${results.length}`);

                    }
                }
                debugger;
                resolve(true);
            });
        });
    })

}


async function migrate_blogs() {
    return new Promise((resolve) => {
        knex_new.schema.hasTable('blogs').then((exists) => {
            knex.from('blogs').select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable('blogs', table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.text('blog_content')
                            table.string('blog_title')
                            table.string('blog_media')
                            table.boolean('featured')
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                        })
                    for (let i = 0; i < results.length; i++) {
                        // find the org account;
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].organisation);
                        const n = results[i];
                        delete n.organisation;
                        n.organisation_id = k[0].id
                        await knex_new('blogs').insert(n);
                        console.log(`Completed ${i + 1} of ${results.length}`);

                    }
                }
                debugger;
                resolve(true);
            });
        });
    })

}


async function migrate_orgs () {
    return new Promise((resolve) => {
        knex_new.schema.hasTable('organisation_account').then((exists) => {
            knex.from('organisation_account').select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable('organisation_account', table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.string('business_contact_email')
                            table.string('company_store_link')
                            table.string('description')
                            table.string('discord_url')
                            table.string('domain_uuid_token')
                            table.string('fb_link');
                            table.string('insta_link');
                            table.string('logo');
                            table.string('name');
                            table.string('primary_color');
                            table.string('stream_team_url')
                            table.string('sub_domain')
                            table.string('support_contact_email')
                            table.string('theme_base_id')
                            table.string('theme_id')
                            table.string('twitch_link');
                            table.string('twitter_feed_username');
                            table.string('twitter_link');
                            table.string('youtube_link')
                        })
                    for (let i = 0; i < results.length; i++) {
                        await knex_new('organisation_account').insert(results[i]);
                    }
                }
                resolve(true);
            });
        });
    })
    
}
    