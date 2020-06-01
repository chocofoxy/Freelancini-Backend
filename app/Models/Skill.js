'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Skill extends Model {

    job () {
        return this.belongsTo('App/Models/Job')
    }

    static get hidden () {
        return ['created_at','updated_at']
    }

}

module.exports = Skill
