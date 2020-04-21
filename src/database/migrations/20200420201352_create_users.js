exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id_user');
  table.float('saldo');
  table.string('email').notNullable();
  table.string('login').notNullable();
  table.string('senha').notNullable();
});

exports.down = (knex) => knex.schema.dropTable('users');
