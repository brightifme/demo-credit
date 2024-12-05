import knex from 'knex';


const db = knex({
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'wallet'
    }
  });
  
  // Create users table if it doesn't exist
  db.schema.createTableIfNotExists('users', (table) => {
    table.increments('id');
    table.string('firstName');
    table.string('lastName');
    table.string('email').unique();
    table.string('phoneNumber').unique();
    table.string('password');
    table.decimal('balance', 10, 2).defaultTo(0.00);
  });
  
  // Create accounts table if it doesn't exist
  db.schema.createTableIfNotExists('accounts', (table) => {
    table.increments('id');
    table.integer('userId').references('id').inTable('users');
    table.decimal('balance', 10, 2).defaultTo(0.00);
  });

  export default db;