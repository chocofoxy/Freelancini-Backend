'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('firstname', 80).notNullable()
      table.string('lastname', 80).notNullable()
      table.string('picture')
      table.date('ddn')
      table.string('domain')
      table.string('skills')
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('wallet', 80).notNullable().defaultTo(0)
      table.boolean('role', 80).notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
