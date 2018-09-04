exports.up = async function (knex) {
    return Promise.all([
        knex.schema.withSchema('origin').createTable('org_sponsors', table => {
            table.increments();
            table
                .string('organisation')
                .references('sub_domain')
                .inTable('origin.organisation_account');
            table.string('image_url');
            table.string('href_link');
            table.string('name');
            table.text('description');
            table.timestamps(true, true);
        }),
    ])
};

