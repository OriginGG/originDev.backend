exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('organisation_account', function (table) {
            table.string('theme_base_id').defaultTo('enigma');
        })
    ])
};

exports.down = async function (knex) {

};
