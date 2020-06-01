'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SkillSchema extends Schema {
  up () {
    this.create('skills', (table) => {
      table.increments()
      table.string('title')
      table.integer('job_id').unsigned().references('id').inTable('jobs').onDelete('cascade')
      table.timestamps()
    })
  }

}

module.exports = SkillSchema
