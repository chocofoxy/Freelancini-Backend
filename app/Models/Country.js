'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Country extends Model {

    adresses() {
        return this.hasMany('App/Models/Adress')
    }

    toJSON() {
        return {
            name : this.name ,
            flag : this.flag
        }
    }
}

module.exports = Country
