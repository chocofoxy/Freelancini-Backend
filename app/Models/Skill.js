'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Skill extends Model {

    certification () {
        return this.hasOne('App/Models/Certification')
    }

    static get hidden () {
        return ['created_at','updated_at']
    }

}

module.exports = Skill
