
exports.up = function (knex, Promise) {

  return Promise.all([
    knex.raw('create schema origin;'),
    knex.schema.withSchema('origin').createTable('user', (table) => {
      table.increments()
      table.timestamps(true,true)
      table.string('first_name')
      table.string('last_name')
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('influence').dropTable('user'),
    // knex.raw('drop schema influence; drop schema influence_private;')
      
    ])
};
