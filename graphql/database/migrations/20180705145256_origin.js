exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('sponsors', function (table) {
            table.text('sponsor_desc1').alter();
            table.text('sponsor_desc2').alter();
            table.text('sponsor_desc3').alter();
            table.text('sponsor_desc4').alter();
        }),
    ])
};