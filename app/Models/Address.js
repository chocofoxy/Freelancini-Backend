'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {

    country () {
        return this.belongsTo('App/Models/Country')
    }

    users () {
        return this.belongsTo('App/Models/User')
    }

    async toJSON () {
        const country = await this.country().fetch()
        return  {
            street : this.street ,
            city : this.city ,
            country : country
        }
    }
    
}

module.exports = Address
