'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Language extends Model {

    user () {
        return this.belongsTo('App/Models/User')
    }

    static get hidden () {
        return ['user_id','created_at','updated_at']
    }


}

module.exports = Language
