'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmploymentSchema extends Schema {
  up () {
    this.create('employments', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('employments')
  }
}

module.exports = EmploymentSchema
