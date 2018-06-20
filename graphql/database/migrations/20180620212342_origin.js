exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('sponsors', function (table) {
            table.string('sponsor_name1').defaultsTo('')
            table.string('sponsor_name2').defaultsTo('')
            table.string('sponsor_name3').defaultsTo('')
            table.string('sponsor_name4').defaultsTo('')
        }),
    ])
};

exports.down = async function (knex) {

};
