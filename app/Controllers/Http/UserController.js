'use strict'
const { validate , formatters } = use('Validator')
const User = use('App/Models/User')
const Freelancer = use('App/Models/Freelancer')
const Client = use('App/Models/Client')
const Country = use('App/Models/Country')
const Address = use('App/Models/Address')
const Language = use('App/Models/Language')
const Helpers = use('Helpers')


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
      country : 'required',
      //profile_pic : 'required'
     }
     , formatters.JsonApi )

    if (!validation.fails()) {
      /*
      const profilePic = request.file('profile_pic', {
        types: ['image'],
        size: '2mb'
      })
    
      await profilePic.move(Helpers.tmpPath('uploads'), {
        name: 'custom-name.jpg',
        overwrite: true
      })*/

      const user = new User()
      user.fill(request.only(['email','username','lastname','firstname', 'password']))
      //user.picture = "uploads"
      await user.client().save(new Client())
      const address = new Address() 
      address.fill(request.only(['street','city']))
      address.country().associate(await Country.find(request.input('country')))
      await user.address().save(address)
      await user.freelance().save(new Freelancer())
      return { code : 200 , mesaage : "dsffsdfsdf" }
     }
    else {
      return { error : { code : 400 , message: validation.messages()[0]['message'] }}
    }
  }

  async login ({ request , response , auth }) {
    const validation = await validate(request.all(),{ email: 'required|email' , password: 'required' })
    if (!validation.fails()) {
      const token = await auth.attempt(request.input('email'),request.input('password'))
      const user = await User.findBy({ email : request.input('email') })
      token.role = user.role
      return  token

    } else {
      return { error : { code : 400 , message: validation.messages()[0]['message'] }}
    }
  }

  async getToken({ request, auth }) {
    return await auth.listTokens()
  }

  async logout ({ request , response , auth }) {
    const user = await auth.getUser()
    return await auth.authenticator('jwt').revokeTokens('')
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
