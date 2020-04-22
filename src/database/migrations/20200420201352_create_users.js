exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id_user');
  table.float('balance').notNullable();
  table.string('email').notNullable();
  table.string('login').notNullable();
  table.string('password').notNullable();
});

exports.down = (knex) => knex.schema.dropTable('users');
