'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelancersSchema extends Schema {
  up () {
    this.create('freelancers', (table) => {
      table.increments()
      table.text('description')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('jobs_nb').defaultTo(0)
      table.string('github')
      table.string('linkedin')
      table.float('job_success').defaultTo(0)
      table.integer('proposals').defaultTo(0)
      table.float('total_earned').defaultTo(0.0)
      table.float('hourly_rate').defaultTo(0.0)
      table.timestamps()
    })
  }

  down () {
    this.drop('freelancers')
  }
}

module.exports = FreelancersSchema
