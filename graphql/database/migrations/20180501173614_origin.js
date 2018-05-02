exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('individual_users', function (table) {
            table.increments();
            table.timestamps(true, true);
        })
    ])
};

exports.down = async function (knex) {

};
