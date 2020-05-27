'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Certification extends Model {

    skill () {
        return this.belongsTo('App/Models/Skill')
    }

    static get hidden () {
        return ['created_at','updated_at']
    }

}

module.exports = Certification
