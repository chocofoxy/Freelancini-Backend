'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Freelancer {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request , response , auth }, next) {
    // call next to advance the request
    const user = await auth.getUser()
    if ( !user.role && user.freelance().setup  )
      await next()
    else if ( !user.role )
      response.json({ error : 400 , message : 'setup your freelance profile'})
    else
      response.json({ error : 400 , message : 'you need to be a freelancer '})
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async wsHandle ({ request }, next) {
    // call next to advance the request
    await next()
  }
}

module.exports = Freelancer
