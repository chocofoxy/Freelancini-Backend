'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  freelance () {
    return this.hasOne('App/Models/Freelancer')
  }

  client () {
    return this.hasOne('App/Models/Client')
  }

  address () {
    return this.hasOne('App/Models/Address')
  }

  languages () {
    return this.hasMany('App/Models/Language')
  }

  static get hidden () {
    return ['password','created_at','updated_at']
  }
/*
  async toJSON () {
    const address = await this.address().fetch()
    const freelance = await this.freelance().fetch()
    const client = await this.client().fetch()
    const languages = await this.languages().fetch()
    return {
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      wallet: this.wallet ,
      languages: languages ,
      birthday: this.ddn ,
      address: await address ,
      freelance: freelance ,
      client: client
    }
  } 
*/
}

module.exports = User
