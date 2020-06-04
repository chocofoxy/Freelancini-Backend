'use strict'

const { validate , formatters } = use('Validator')
const User = use('App/Models/User')
const Freelancer = use('App/Models/Freelancer')
const Interview = use('App/Models/Interview')
const Job = use('App/Models/Job')
const Contract = use('App/Models/Contract')

class FreelanceController {

  async SubmitForJob({ request , auth , params }) {
   // try { 
          const user = await auth.getUser()
          const freelancer = await user.freelance().fetch()
          const job = await Job.findOrFail(params.id)
          const client = await job.client().fetch()
          const x = await job.interviews().where('freelancer_id', '=' , freelancer.id ).getCount()
          console.log(x);
          
          if ( freelancer.proposals > job.slots && freelancer.id != client.id  && x == 0 )
          {
            const interview = new Interview()
            await interview.save()
            interview.fill(request.only(['lettre','price','time']))
            interview.job().associate(job)
            freelancer.proposals -= job.slots
            freelancer.save()
            interview.freelancer().associate(freelancer)
            interview.merge()
            return { code : 200 , message : " interview submitted"}
          } else {
            return { code : 400 , message : " it's your job , you don't have enought propsals or you already submitted"}
          } 
    /*   } catch (err) {
          return { code : 500 , message : "error"}
    }*/
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
            return { code : 400 , message : " it's not your interview or interview's status changed "}
          } 
       } catch (err) {
          return err
    }
  }

  async endContract({ auth , params }) {
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
            return { code : 400 , message : " it's not your interview or interview's status changed "}
          } 
       } catch (err) {
          return err
    }
  }


  async contract ({ auth , params }) {
    const contract = await Contract.query().where('id','=',params.id).with('job').with('client.user').with('freelancer.user').fetch()
    return contract
  }

  async acceptContract ({ auth , params }) {
    const contract = await Contract.find(params.id)
    contract.status = true ;
    contract.save()
    return contract
  }

  async declineContract ({ auth , params }) {
    const contract = await Contract.find(params.id)
    contract.status = false ;
    contract.save()
    return contract
  }

}

module.exports = FreelanceController
