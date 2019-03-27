exports.up = async function (knex) {
    return Promise.all([
        knex.schema
            .withSchema('origin')
            .alterTable('pages', table => {
                table.text('page_subtitle').alter();
                table.text('page_title').alter();
            })
    ])
};

exports.down = async function (knex) {

};
