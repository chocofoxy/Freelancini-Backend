'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Job extends Model {

    client () {
        return this.belongsTo('App/Models/Client')
    }

    interviews () {
        return this.hasMany('App/Models/Interview')
    }

    static get hidden () {
        return ['client_id','created_at','updated_at']
      }
}

module.exports = Job
