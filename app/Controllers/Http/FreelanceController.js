'use strict'

const { validate , formatters } = use('Validator')
const User = use('App/Models/User')
const Freelancer = use('App/Models/Freelancer')

class FreelanceController {

  async SubmitForJob({ request , response , auth , parmas }) {
    response.json({ code : 200 })
  }


}

module.exports = FreelanceController
