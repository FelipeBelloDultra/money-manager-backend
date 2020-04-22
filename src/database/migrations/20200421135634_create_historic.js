exports.up = (knex) => knex.schema.createTable('historics', (table) => {
  table.increments('id_hist');
  table.string('description').notNullable();
  table.enu('type', ['deposit', 'withdraw']).notNullable();
  table.float('old_value').notNullable();
  table.float('additional_value').notNullable();
  table.float('amount').notNullable();
  table.dateTime('date').notNullable();
  table.string('user_id').notNullable();
  table.foreign('user_id').references('id_user').inTable('users');
});

exports.down = (knex) => knex.schema.dropTable('historics');
