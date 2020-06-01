'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractSchema extends Schema {
  up () {
    this.create('contracts', (table) => {
      table.increments()
      table.float('price')
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('cascade')
      table.integer('freelancer_id').unsigned().references('id').inTable('freelancers').onDelete('cascade')
      table.integer('job_id').unsigned().references('id').inTable('jobs').onDelete('cascade')
      table.boolean('status')
      table.date('starting_date')
      table.date('ending_date')
      table.boolean('ended')
      table.timestamps()
    })
  }

  down () {
    this.drop('contracts')
  }
}

module.exports = ContractSchema
