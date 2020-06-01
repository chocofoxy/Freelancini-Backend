'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InterviewSchema extends Schema {
  up () {
    this.create('interviews', (table) => {
      table.increments()
      table.float('price')
      table.string('lettre')
      table.boolean('status')
      table.integer('job_id').unsigned().references('id').inTable('jobs').onDelete('cascade')
      table.integer('freelancer_id').unsigned().references('id').inTable('freelancers').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('interviews')
  }
}

module.exports = InterviewSchema
