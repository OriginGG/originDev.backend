exports.up = async function(knex) {
    {
        return Promise.all([
            knex.schema.withSchema('origin').table('individual_users', function (table) {
                table.string('contact_email').defaultTo('');
            })
        ])
    }
};

exports.down = async function(knex) {

};
