'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InterviewSchema extends Schema {
  up () {
    this.create('interviews', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('interviews')
  }
}

module.exports = InterviewSchema
