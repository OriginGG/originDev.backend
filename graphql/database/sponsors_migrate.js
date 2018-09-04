const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);

knex.from('sponsors').select('*').then(results => {
    knex('org_sponsors').del().then(async () => {
        for (let i = 0; i < results.length; i++) {
            const x = results[i];
            await knex('org_sponsors')
                .insert({
                    organisation: x.organisation,
                    image_url: x.sponsor1,
                    name: x.sponsor_name1,
                    description: x.sponsor_desc1,
                    href_link: x.href_link1
                });
            await knex('org_sponsors')
                .insert({
                    organisation: x.organisation,
                    image_url: x.sponsor2,
                    name: x.sponsor_name2,
                    description: x.sponsor_desc2,
                    href_link: x.href_link2
                });
            await knex('org_sponsors')
                .insert({
                    organisation: x.organisation,
                    image_url: x.sponsor3,
                    name: x.sponsor_name3,
                    description: x.sponsor_desc3,
                    href_link: x.href_link3
                });
            await knex('org_sponsors')
                .insert({
                    organisation: x.organisation,
                    image_url: x.sponsor4,
                    name: x.sponsor_name4,
                    description: x.sponsor_desc4,
                    href_link: x.href_link4
                });
        }
        console.log('Finished...');
    });
})