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

    skills () {
        return this.hasMany('App/Models/Skill')
    }

    contract () {
        return this.hasOne('App/Models/Contract')
    }

    static get hidden () {
        return ['client_id','updated_at']
      }
    /*
    async toJSON() {
        const client = await this.client().fetch()
        const user = await client.user().fetch()
        return {
            job : this ,
            user : user
        }
    }*/
}

module.exports = Job
