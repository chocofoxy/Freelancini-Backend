'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobSchema extends Schema {
  up () {
    this.create('jobs', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('discription').notNullable()
      table.integer('slots').notNullable()
      table.float('price').notNullable()
      table.integer('time').notNullable()
      table.string('skills').defaultTo("")
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('jobs')
  }
}

module.exports = JobSchema
