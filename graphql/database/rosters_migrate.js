const environment = "local"
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);

knex.from('origin.rosters').select('*').then(results => {
  async () => {
      console.log(results);
        for (let i = 0; i < results.length; i++) {
            const x = results[i];
            console.log(x);
            // await knex('org_sponsors')
            //     .insert({
            //         organisation: x.organisation,
            //         image_url: x.sponsor1,
            //         name: x.sponsor_name1,
            //         description: x.sponsor_desc1,
            //         href_link: x.href_link1
            //     });
            // await knex('org_sponsors')
            //     .insert({
            //         organisation: x.organisation,
            //         image_url: x.sponsor2,
            //         name: x.sponsor_name2,
            //         description: x.sponsor_desc2,
            //         href_link: x.href_link2
            //     });
            // await knex('org_sponsors')
            //     .insert({
            //         organisation: x.organisation,
            //         image_url: x.sponsor3,
            //         name: x.sponsor_name3,
            //         description: x.sponsor_desc3,
            //         href_link: x.href_link3
            //     });
            // await knex('org_sponsors')
            //     .insert({
            //         organisation: x.organisation,
            //         image_url: x.sponsor4,
            //         name: x.sponsor_name4,
            //         description: x.sponsor_desc4,
            //         href_link: x.href_link4
            //     });
        }
        console.log('Finished...');
    };
})