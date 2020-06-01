'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contract extends Model {

    client () {
        return this.belongsTo('App/Models/Client')
    }

    freelancer () {
        return this.belongsTo('App/Models/Freelancer')
    }

    job () {
        return this.belongsTo('App/Models/Job')
    }
}

module.exports = Contract
