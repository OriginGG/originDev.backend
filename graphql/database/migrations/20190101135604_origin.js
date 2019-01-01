exports.up = async function(knex) {
    return Promise.all([
        knex.schema.table('org_sponsors', function (table) {
            table.string('bg_images').defaultsTo('')
        }),
    ])
};

exports.down = async function(knex) {

};
