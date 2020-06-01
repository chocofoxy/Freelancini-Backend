'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Freelancer extends Model {

  user() {
    return this.belongsTo('App/Models/User')
  }

  interviews () {
    return this.hasMany('App/Models/Interview')
  }

  contracts () {
    return this.hasMany('App/Models/Contract')
  }

  static get hidden () {
    return ['user_id','created_at','updated_at']
  }

}

module.exports = Freelancer
