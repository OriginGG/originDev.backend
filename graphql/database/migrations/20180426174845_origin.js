exports.up = async function (knex) {
    return Promise.all([
        knex.schema
            .withSchema('origin')
            .createTable('individual_users', table => {
                table.string('first_name');
                table.string('last_name');
                table
                    .string('email')
                    .notNull()
                    .unique();
                table.string('password_hash').notNull();
                table.text('about')
                table.string('contact_number')
            })
    ])
};

exports.down = async function (knex) {

};
