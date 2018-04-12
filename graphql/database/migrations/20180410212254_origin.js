exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('sponsors', function (table) {
            table.string('sponsor_desc1').defaultTo('');
            table.string('sponsor_desc2').defaultTo('');
            table.string('sponsor_desc3').defaultTo('');
            table.string('sponsor_desc4').defaultTo('');
        })
    ])

};
exports.down = async function (knex) {
    return Promise.all([
        knex.schema.table('users', function (table) {
            table.dropColumn('sponsor_desc1');
            table.dropColumn('sponsor_desc2');
            table.dropColumn('sponsor_desc3');
            table.dropColumn('sponsor_desc4');
        })
    ])
};
