'use strict'
const Job = use('App/Models/Job')
const Interview = use('App/Models/Interview')
const Contract = use('App/Models/Contract')


class ClientController {

    async addJob ({ request, response , auth }) {
        try { 
            const job = new Job()
            job.fill(request.only(['title','discription','slots','price', 'time',"skills"]))
            const user = await auth.getUser()
            const client = await user.client().fetch()
            job.client().associate(client)
            return { code : 200 , message : " created "}
        } catch (err) {
            return err
        }
      }

    async deleteJob ({ auth , params }) {
      try {
        const job = await Job.findOrFail(params.id)
        const user = await auth.getUser()
        const client = await user.client().fetch()
        const jobClient = await job.client().fetch()
        const interviews = await job.interviews().getCount()
        if ( jobClient.id == client.id && interviews == 0 ) {
                job.delete()
                return  { code : 200 , message : " job has been deleted ! " }
            } else {
                return  { code : 400 , message : " this isn't your job or someone already submitted an interview " }
            }
        } catch (err) {
            return err
        }      
    }

    async jobs ({  auth  }) {
        const user = await auth.getUser()
        const client = await user.client().fetch();
        //const jobs = await client.jobs().fetch();
        const jobs = await Job.query().where('client_id','=',client.id).with('client.user').with('contract.freelancer.user').fetch()
        return jobs
    }


    async declineInterview ({ auth , params }) {
        const interview = interview.find(params.id)
        const user = await auth.getUser()
        const client = await user.client().fetch()
        const jobClient = await interview.job().client().fetch()
        if (jobClient.id == client.id ) {
            interview.update({ status : false })
        } else {
            return { code : 403 , message: " it's not your job " }
        }
    }

    async acceptInterview ({ auth , params }) {
        const interview = interview.find(params.id)
        const user = await auth.getUser()
        const client = await user.client().fetch()
        const jobClient = await interview.job().client().fetch()
        if (jobClient.id == client.id ) {
            interview.update({ status : true })
            const contract = new Contract()
        } else {
            return { code : 403 , message: " it's not your job " }
        }
    }

    async hire ({ auth , params }) {
        const interview = interview.find(params.id)
        const user = await auth.getUser()
        const client = await user.client().fetch()
        const jobClient = await interview.job().client().fetch()
        if (jobClient.id == client.id ) {
            interview.update({ status : true })
            const contract = new Contract()
        } else {
            return { code : 403 , message: " it's not your job " }
        }

    }

    async interviews ({  auth , params }) {
        const job = await Job.find(params.id)
        const user = await auth.getUser()
        const client = await user.client().fetch()
        const jobClient = await job.client().fetch()
        const interviews = await job.interviews().with('freelancer.user').fetch()
        if (jobClient.id == client.id ) {
            return interviews
        } else {
            return { code : 403 , message: " it's not your job " }
        } 
    }

    async interview ({  auth , params }) {
        //const interview = await interview.find(params.id)
        return await Interview.query().where('id','=',params.id).with('freelancer.user').with('job.client.user').fetch()
        
    }

    async makeContract ({ request ,  auth }) {
        const contract = new Contract()
        await contract.save()
        contract.merge(request.only(['starting_date','ending_date']))
        const interview = await Interview.find(request.input('interview'))
        contract.price = interview.price
        contract.ended = false 
        const freelancer = await interview.freelancer().fetch()
        const job = await interview.job().fetch()
        const client = await job.client().fetch()
        contract.job().associate(job)
        contract.freelancer().associate(freelancer)
        contract.client().associate(client)
        await contract.save()
        return  { code :200 , message : "dqsdqsdqsd" }
    }

   

}

module.exports = ClientController
