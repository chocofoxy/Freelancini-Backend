'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LanguagesSchema extends Schema {
  up () {
    this.create('languages', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.string('name')
      table.integer('level')
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('languages')
  }
}

module.exports = LanguagesSchema
