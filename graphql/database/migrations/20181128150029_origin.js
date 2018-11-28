exports.up = async function(knex) {{
    return Promise.all([
        knex.schema.table('organisation_account', function (table) {
            table.string('stream_team_url').defaultTo('');
        })
    ])
}};

exports.down = async function(knex) {

};
