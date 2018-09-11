exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('users', function (table) {
            table.boolean('subscribed').defaultTo(false);
        })
    ])
};