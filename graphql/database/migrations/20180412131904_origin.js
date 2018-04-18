exports.up = async function(knex) {
    return Promise.all([
        knex.schema
            .withSchema('origin')
            .createTable('domain_registration', table => {
                table.increments();
                table.timestamps(true, true);
                table.text('token');
                table.string('host').unique();
            })
        ])
};

exports.down = async function(knex) {

};
