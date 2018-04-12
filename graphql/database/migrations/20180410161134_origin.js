exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('sponsors', function (table) {
            table.string('href_link1').defaultTo('');
            table.string('href_link2').defaultTo('');
            table.string('href_link3').defaultTo('');
            table.string('href_link4').defaultTo('');
        })
    ])

};

exports.down = async function(knex) {
    return Promise.all([
        knex.schema.table('users', function (table) {
            table.dropColumn('href_link1');
            table.dropColumn('href_link2');
            table.dropColumn('href_link3');
            table.dropColumn('href_link4');
        })
    ])
};
