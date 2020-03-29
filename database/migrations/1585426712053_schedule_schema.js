'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up () {
    this.create('schedules', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
      
        .integer('pacient_id')
        .unsigned()
        .references('id')
        .inTable('pacients')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')  
      table.date('date').notNullable()
      table.time('time').notNullable()
      table.string('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema
