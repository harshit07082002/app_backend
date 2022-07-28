/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("student", (table) => {
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.timestamp(true, true);
    })
    .createTable("books", (table) => {
      table.string("book_name").notNullable();
      table.string("author_name").notNullable();
      table.string("borrowed_by");
      table.date("date_of_borrow");
      table.date("date_of_return");
      table.timestamp(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("student").dropTable("books");
};
