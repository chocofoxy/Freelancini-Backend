'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.string('city')
      table.string('street')
      table.integer('zip')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('country_id').unsigned().references('id').inTable('countries').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
