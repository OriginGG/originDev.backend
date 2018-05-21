exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('individual_users', function (table) {
            table.boolean('authenticated').defaultTo(true);
        })
    ])
};

exports.down = async function (knex) {

};
