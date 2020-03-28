"use strict";

const Schema = use("Schema");

class PacientsSchema extends Schema {
  up() {
    this.create("pacients", table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .notNullable()  
      table.string('username').notNullable()
      table.string('fone').notNullable()
      table.string('email').notNullable()
      table.timestamps()
    });
  }

  down() {
    this.drop("pacients")
  }
}

module.exports = PacientsSchema;
