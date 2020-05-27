'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CertificationSchema extends Schema {
  up () {
    this.create('certifications', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('field').notNullable()
      table.integer('year').notNullable()
      table.string('source').notNullable()
      table.integer('level').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('certifications')
  }
}

module.exports = CertificationSchema
