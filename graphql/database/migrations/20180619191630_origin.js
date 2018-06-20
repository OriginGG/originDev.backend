const fs = require('fs');

exports.up = async function (knex) {
    await knex.schema
        .withSchema('origin')
        .createTable('organisation_members', table => {
            table.increments();
            table.timestamps(true, true);
            table.string('organisation').references('sub_domain').inTable('origin.organisation_account');
            table.integer('individal_user_id').references('id').inTable('origin.individual_users')
            table.string('host').unique();
    })
    await (new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/../postgreSQL_schemas/10_origin_schema.sql`, 'utf8', async (err, data) => {
            if (err) {
                reject(err);
            }
            await knex.raw(data)
            console.log('new sql 10 functions');
            resolve(true);
        });
    }))
};

exports.down = async function (knex) {

};
