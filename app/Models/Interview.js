'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Interview extends Model {

    job () {
        return this.belongsTo('App/Models/Job')
    }

    freelancer () {
        return this.belongsTo('App/Models/Freelancer')
    }

    static get hidden () {
        return ['freelancer_id','created_at','updated_at']
      }
}

module.exports = Interview
