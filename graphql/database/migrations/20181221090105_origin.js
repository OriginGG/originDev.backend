exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('organisation_account', function (table) {
            table.string('domain_uuid_token').defaultTo(null);
        })
    ])

};
