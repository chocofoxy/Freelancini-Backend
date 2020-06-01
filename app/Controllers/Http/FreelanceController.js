'use strict'

const { validate , formatters } = use('Validator')
const User = use('App/Models/User')
const Freelancer = use('App/Models/Freelancer')
const Interview = use('App/Models/Interview')
const Job = use('App/Models/Job')


class FreelanceController {

  async SubmitForJob({ request , auth , params }) {
    try { 
          const user = await auth.getUser()
          const freelancer = await user.freelance().fetch()
          const job = await Job.findOrFail(params.id)
          const client = await job.client().fetch()
          if ( freelancer.proposals > job.slots && user.id != client.id )
          {
            const interview = new Interview()
            interview.fill(request.only(['lettre','price']))
            interview.freelancer().associate(freelancer)
            return { code : 200 , message : " interview submitted"}
          } else {
            return { code : 400 , message : " it's your job or you don't have enought propsals "}
          } 
       } catch (err) {
          return err
    }
  }

  async deleteSubmition({  auth , params }) {
    try { 
          const user = await auth.getUser()
          const freelancer = await user.freelance().fetch()
          const interview = await Interview.findOrFail(params.id)
          const interviewFreelancer = await interview.freelancer().fetch()
          if ( freelancer.id == interviewFreelancer.id && interview.status == null )
          {
            interview.delete()
            return { code : 200 , message : " interview deleted"}
          } else {
            return { code : 400 , message : " it's not your interview or interview is status changed "}
          } 
       } catch (err) {
          return err
    }
  }




}

module.exports = FreelanceController
