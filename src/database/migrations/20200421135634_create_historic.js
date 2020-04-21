exports.up = (knex) => knex.schema.createTable('historics', (table) => {
  table.increments('id_hist');
  table.string('descricao').notNullable();
  table.enu('tipo', ['deposito', 'saque']).notNullable();
  table.dateTime('data');
  table.string('user_id').notNullable();
  table.foreign('user_id').references('id_user').inTable('users');
});

exports.down = (knex) => knex.schema.dropTable('historics');
