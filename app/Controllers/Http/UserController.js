'use strict'
const { validate , formatters } = use('Validator')
const User = use('App/Models/User')
const Freelancer = use('App/Models/Freelancer')
const Client = use('App/Models/Client')
const Country = use('App/Models/Country')
const Address = use('App/Models/Address')
const Language = use('App/Models/Language')

class UserController {

  async signup ({ request , response }) {
    const validation = await validate(request.all(), {
      email: 'required|email',
      firstname: 'required',
      username: 'required',
      lastname: 'required',
      password: 'required',
      street: 'required',
      city : 'required',
      country : 'required'
     }
     , formatters.JsonApi )

    if (!validation.fails()) {
      const user = new User()
      user.fill(request.only(['email','username','lastname','firstname', 'password']))
      await user.client().save(new Client())
      const address = new Address() 
      address.fill(request.only(['street','city']))
      address.country().associate(await Country.find(request.input('country')))
      await user.address().save(address)
      return await user.freelance().save(new Freelancer())
     }
    else {
      return { error : { code : 400 , message: validation.messages()[0]['message'] }}
    }
  }

  async login ({ request , response , auth }) {
    const validation = await validate(request.all(),{ email: 'required|email' , password: 'required' })
    if (!validation.fails()) {
      return await auth.attempt(request.input('email'),request.input('password'))
    } else {
      return { error : { code : 400 , message: validation.messages()[0]['message'] }}
    }
  }

  async logout ({ request , response , auth }) {
    await auth.authenticator('jwt').revokeTokensForUser(await auth.getUser())
  }

  async informations ({ request, response , auth }) {
    //return await auth.getUser()
    const user = await auth.getUser()
    return user.toJSON()
  }

  async update ({ request, response , auth }) {
    //return auth.getUser()
  }

  async destroy ({ request, response , auth }) {
    const user = await auth.getUser()
    user.delete()
  }

  async addLanguge ({ request, response , auth }) {
    const user = await auth.getUser()
    const language = new Language()
    language.fill(request.only(['name','level','type']))
    user.languages().save(language)
  }

  async deleteLanguge ({ request, response , auth  , params }) {
    const user = await auth.getUser()
    await user.languages().where('id',params.id).delete()
  }

  async addSkill ({ request, response , auth }) {
    const user = await auth.getUser()
    user.delete()
  }

  async switchRole ({ request, response , auth }) {
    const user = await auth.getUser()
    user.role = !user.role
    await user.save()
    response.json({ code : 200 , message: `role switched to ${ user.role ? 'client' : 'freelancer' }`})
  }

}

module.exports = UserController
