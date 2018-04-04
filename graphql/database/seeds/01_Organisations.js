let createRecord = (knex, nm, sd, ds, fb, is, tw, twi, lg, pc, tf, tn) => {
    return knex('origin.organisation_account').insert({
        name: nm,
        sub_domain: sd,
        description: ds,
        fb_link: fb,
        insta_link: is,
        twitter_link: tw,
        twitch_link: twi,
        logo: lg,
        primary_color: pc,
        twitter_feed_username: tf,
        theme_id: tn
    });
};

exports.seed = function seed(knex, Promise) {
    console.log('Create Organisations');
    return knex('origin.organisation_account')
        .del()
        .then(() => {
            let records = [];
            records.push(
                createRecord(
                    knex,
                    'Origin',
                    'origin',
                    'Desc',
                    'http://',
                    'http://',
                    'https://twitter.com/origin_gg',
                    'http://',
                    'http://',
                    '#0a9ab4',
                    'origin',
                    'light'
                )
            );
            return Promise.all(records);
        });
};

