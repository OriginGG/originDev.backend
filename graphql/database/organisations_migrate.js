const environment = 'production'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);
const config_new = require('./knexfile.js')['config_new'];
const knex_new = require('knex')(config_new);


do_migration();


async function do_migration() {
    await migrate_orgs();
    await migrate_blogs();
    await migrate_combined_rosters();
    await migrate_individuals();
    await migrate_rosters();
    await migrate_combined_roster_individuals();
    await migrate_members();
    await migrate_content_team();
    await migrate_users();
    await migrate_email_touch();
    await migrate_org_sponsors();
    await migrate_pages();
    await migrate_pre_users();
    await migrate_recent_matches();
    await migrate_registration_emails();
    await migrate_roster_individuals();
    await migrate_sponsors();
    await migrate_staff();
    await migrate_staff_individuals();
    await migrate_stripe_customers();
    await migrate_themes();
    await migrate_twitch_channels();
    await migrate_youtube_channels();
    await migrate_domain_registration();
};

async function migrate_domain_registration() {
    const t = 'domain_registration';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.text('token')
                            table.string('host')
                        })
                    for (let i = 0; i < results.length; i++) {
                        await knex_new(t).insert(results[i]);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Domain Registration')
                resolve(true);
            });
        });
    })

}
async function migrate_twitch_channels() {
    const t = 'twitch_channels';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                            table.string('channel_name')
                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].organisation);
                        const n = results[i];
                        if (k.length !== 0) {
                            n.organisation_id = k[0].id
                            // find the org account;
                            await knex_new(t).insert(n);
                        }
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Twitch Channels')
                resolve(true);
            });
        });
    })

}
async function migrate_youtube_channels() {
    const t = 'youtube_channels';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                            table.string('youtube_video_1')
                            table.string('youtube_video_2')
                            table.string('youtube_video_3')
                            table.string('youtube_video_4')
                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].organisation);
                        const n = results[i];
                        if (k.length !== 0) {
                            n.organisation_id = k[0].id
                            delete n.organisation;
                            // find the org account;
                            await knex_new(t).insert(n);
                        }
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed YouTube Channels')
                resolve(true);
            });
        });
    })

}


async function migrate_themes() {
    const t = 'themes';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                            table.string('theme_name')
                            table.jsonb('theme_data');
                            table.jsonb('theme_structure');
                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].theme_name);
                        const n = results[i];
                        if (k.length !== 0) {
                            n.organisation_id = k[0].id
                            // find the org account;
                            await knex_new(t).insert(n);
                        }
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Themes')
                resolve(true);
            });
        });
    })

}



async function migrate_stripe_customers() {
    const t = 'stripe_customers';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('user_id').references('id').inTable('origin.users');
                            table.string('customer_id_token');
                            table.string('default_source');
                            table.string('description');
                            table.string('invoice_prefix');
                            table.string('email');
                        })
                    for (let i = 0; i < results.length; i++) {
                        await knex_new(t).insert(results[i]);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Stripe Customers')
                resolve(true);
            });
        });
    })

}

async function migrate_staff_individuals() {
    const t = 'staff_individuals';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('individual_id').references('id').inTable('origin.individual_users')
                            table.integer('staff_id').references('id').inTable('origin.staff')
                        })
                    for (let i = 0; i < results.length; i++) {
                        await knex_new(t).insert(results[i]);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Staff Individuals')
                resolve(true);
            });
        });
    })

}



async function migrate_sponsors() {
    const t = 'sponsors';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                            table.string('href_link1')
                            table.string('href_link2')
                            table.string('href_link3')
                            table.string('href_link4')
                            table.string('sponsor1')
                            table.string('sponsor2')
                            table.string('sponsor3')
                            table.string('sponsor4')
                            table.text('sponsor_desc1')
                            table.text('sponsor_desc2')
                            table.text('sponsor_desc3')
                            table.text('sponsor_desc4')
                            table.text('sponsor_name1')
                            table.text('sponsor_name2')
                            table.text('sponsor_name3')
                            table.text('sponsor_name4')
                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].organisation);
                        const n = results[i];
                        if (k.length !== 0) {
                            delete n.organisation;
                            n.organisation_id = k[0].id
                            // find the org account;
                            await knex_new(t).insert(n);
                        }
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Sponsors')
                resolve(true);
            });
        });
    })

}


async function migrate_staff() {
    const t = 'staff';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('position_id')
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].sub_domain);
                        const n = results[i];
                        if (k.length !== 0) {
                            delete n.sub_domain;
                            n.organisation_id = k[0].id
                            // find the org account;
                            await knex_new(t).insert(n);
                        }
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Staff')
                resolve(true);
            });
        });
    })

}



async function migrate_roster_individuals() {
    const t = 'roster_individuals';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('individual_id').references('id').inTable('origin.individual_users')
                            table.integer('roster_id').references('id').inTable('origin.rosters')
                        })
                    for (let i = 0; i < results.length; i++) {
                        await knex_new(t).insert(results[i]);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Roster Individuals')
                resolve(true);
            });
        });
    })

}


async function migrate_registration_emails() {
    const t = 'registration_emails';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.string('email')
                            table.text('payload')
                        })
                    for (let i = 0; i < results.length; i++) {
                        await knex_new(t).insert(results[i]);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Registration Emails')
                resolve(true);
            });
        });
    })

}

async function migrate_recent_matches() {
    const t = 'recentmatches';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.string('event_date').defaultTo('')
                            table.string('event_description', 262144)
                            table.string('event_info');
                            table.string('event_league');
                            table.string('event_url');
                            table.string('game_logo');
                            table.string('game_name');
                            table.string('score');
                            table.string('type');
                            table.string('opposite_team_name');
                            table.string('opposite_team_logo');
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')

                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].organisation);
                        const n = results[i];
                        if (k.length !== 0) {
                            delete n.organisation;
                            n.organisation_id = k[0].id
                            // find the org account;
                            await knex_new(t).insert(n);
                        }
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Recent Matches')
                resolve(true);
            });
        });
    })

}


async function migrate_pre_users() {
    const t = 'pre_users';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.string('name');
                            table
                                .string('email')
                                .notNull()
                                .unique();
                            table.string('password').notNull();
                            table.boolean('admin_user').defaultTo(false);
                        })
                    for (let i = 0; i < results.length; i++) {
                        // find the org account;
                        await knex_new(t).insert(results[i]);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);

                    }
                }
                console.log('Completed Pre Users')
                resolve(true);
            });
        });
    })

}



async function migrate_pages() {
    const t = 'pages';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.text('page_content')
                            table.string('page_key')
                            table.string('page_subtitle')
                            table.string('page_title')
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].organisation);
                        const n = results[i];
                        if (k.length !== 0) {
                            delete n.organisation;
                            n.organisation_id = k[0].id
                            // find the org account;
                            await knex_new(t).insert(n);
                        }
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);

                    }
                }
                console.log('Completed Pages')
                resolve(true);
            });
        });
    })

}


async function migrate_org_sponsors() {
    const t = 'org_sponsors';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.text('description')
                            table.string('href_link')
                            table.string('image_url')
                            table.string('name')
                            table.string('bg_images')
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].organisation);
                        const n = results[i];
                        if (k.length !== 0) {
                            delete n.organisation;
                            n.organisation_id = k[0].id
                            // find the org account;
                            await knex_new(t).insert(n);
                        }
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);

                    }
                }
                console.log('Completed Org Sponsors')
                resolve(true);
            });
        });
    })

}


async function migrate_email_touch() {
    const t = 'email_touch';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.boolean('email_fire_success')
                            table.boolean('email_response_success')
                            table.dateTime('email_sent_date')
                            table.integer('num_touch_up_email_sent')
                            table.integer('user_id').references('id').inTable('origin.users')
                        })
                    for (let i = 0; i < results.length; i++) {
                        await knex_new(t).insert(results[i]);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);
                    }
                }
                console.log('Completed Email Touch')
                resolve(true);
            });
        });
    })

}


async function migrate_users() {
    const t = 'users';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.boolean('admin_user')
                            table.boolean('subscribed')
                            table.boolean('authenticated')
                            table.string('email')
                            table.string('password_hash')
                            table.string('first_name')
                            table.string('last_name')
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].organisation);
                        const n = results[i];
                        if (k.length !== 0) {
                            delete n.organisation;
                            n.organisation_id = k[0].id
                            // find the org account;
                            await knex_new(t).insert(n);
                        }
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);

                    }
                }
                console.log('Completed Users')
                resolve(true);
            });
        });
    })

}

async function migrate_content_team() {
    const t = 'content_team';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('member_id').references('id').inTable('origin.organisation_members')
                        })
                    for (let i = 0; i < results.length; i++) {
                        // find the org account;
                        await knex_new(t).insert(results[i]);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);

                    }
                }
                console.log('Completed Content Team')
                resolve(true);
            });
        });
    })

}


async function migrate_members() {
    const t = 'organisation_members';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                            table.integer('individal_user_id').references('id').inTable('origin.individual_users')
                            table.string('host')
                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].organisation);
                        const n = results[i];
                        delete n.organisation;
                        n.organisation_id = k[0].id
                        // find the org account;
                        await knex_new(t).insert(n);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);

                    }
                }
                console.log('Completed Members')
                resolve(true);
            });
        });
    })

}


async function migrate_rosters() {
    const t = 'rosters';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.integer('game_id')
                            table.integer('organisation_id').references('id').inTable('origin.organisation_account')
                            table.string('team_name')
                        })
                    for (let i = 0; i < results.length; i++) {
                        const k = await knex_new.from('organisation_account').select('*').where('sub_domain', '=', results[i].sub_domain);
                        const n = results[i];
                        delete n.sub_domain;
                        n.organisation_id = k[0].id
                        // find the org account;
                        await knex_new(t).insert(n);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);

                    }
                }
                console.log('Completed Roster')
                resolve(true);
            });
        });
    })

}

async function migrate_individuals() {
    const t = 'individual_users';
    return new Promise((resolve) => {
        knex_new.schema.hasTable(t).then((exists) => {
            knex.from(t).select('*').then(async results => {
                if (!exists) {
                    await knex_new.schema
                        .withSchema('origin')
                        .createTable(t, table => {
                            table.increments();
                            table.timestamps(true, true);
                            table.text('about')
                            table.text('accomplishments')
                            table.boolean('authenticated')
                            table.text('banner_image_url')
                            table.string('contact_email')
                            table.string('contact_number')
                            table.string('email')
                            table.string('facebook_link')
                            table.string('first_name')
                            table.string('last_name')
                            table.string('password_hash')
                            table.string('instagram_link')
                            table.text('profile_image_url')
                            table.string('twitch_url')
                            table.string('twitch_user_id')
                            table.string('twitter_handle')
                            table.string('username')
                            table.string('youtube_channel')
                            table.string('youtube_video1_url')
                            table.string('youtube_video2_url')
                            table.string('youtube_video3_url')
                        })
                    for (let i = 0; i < results.length; i++) {
                        // find the org account;
                        await knex_new(t).insert(results[i]);
                        console.log(`Completed ${t} ${i + 1} of ${results.length}`);

                    }
                }
                console.log('Completed Individuals')
                resolve(true);
            });
        });
    })

}


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
                            table.integer('individual_id').references('id').inTable('origin.individual_users')
                            table.string('individual_type')
                            table.integer('roster_id').references('id').inTable('origin.combined_rosters')
                        })
                    for (let i = 0; i < results.length; i++) {
                        // find the org account;
                        await knex_new('combined_roster_individuals').insert(results[i]);
                        console.log(`Completed ${i + 1} of ${results.length}`);

                    }
                }
                console.log('Completed Combined Roster Individuals')
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
                console.log('Completed Combined Roster')
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
                console.log('Completed Blogs')
                resolve(true);
            });
        });
    })

}


async function migrate_orgs() {
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
                            table.string('sub_domain');
                            table.string('primary_color');
                            table.string('stream_team_url')
                            table.string('support_contact_email')
                            table.string('theme_base_id')
                            table.string('theme_id')
                            table.string('twitch_link');
                            table.string('twitter_feed_username');
                            table.string('twitter_link');
                            table.string('youtube_link')
                        })
                    for (let i = 0; i < results.length; i++) {
                        const n = results[i];
                        await knex_new('organisation_account').insert(n);
                        console.log(`Completed ${i + 1} of ${results.length}`);

                    }
                }
                console.log('Completed Organisations')
                resolve(true);
            });
        });
    })

}
