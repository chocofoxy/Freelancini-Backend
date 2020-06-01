'use strict'
const Job = use('App/Models/Job')


class ClientController {

    async addJob ({ request, response , auth }) {
        try { 
            const job = new Job()
            job.fill(request.only(['title','discription','slots','price', 'time']))
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
        const jobs = await client.jobs().fetch();
        return jobs
    }


    async declineInterview ({ auth , params }) {
        const job = new Job.find(params.id)
        const user = await auth.getUser()
        
        if ( job.client() == client && 'df' ) {
            job.delete()
            return  { code : 200 , message : " job has been deleted ! " }
        } else {
            return  { code : 400 , message : " somthing wrong !! " }
        }
    }

    async acceptInterview ({ request, response , auth , params }) {
        const job = new Job.find(params.id)
        const user = await auth.getUser()

        if ( job.client() == client && 'df' ) {
            job.delete()
            return  { code : 200 , message : " job has been deleted ! " }
        } else {
            return  { code : 400 , message : " somthing wrong !! " }
        }
    }

    async interviews ({ request, response , auth , params }) {
        const job = new Job.find(params.id)
        const user = await auth.getUser()

        if ( job.client() == client && 'df' ) {
            job.delete()
            return  { code : 200 , message : " job has been deleted ! " }
        } else {
            return  { code : 400 , message : " somthing wrong !! " }
        }
    }

    async endContract ({ request, response , auth , params }) {
        const job = new Job.find(params.id)
        const user = await auth.getUser()

        if ( job.client() == client && 'df' ) {
            job.delete()
            return  { code : 200 , message : " job has been deleted ! " }
        } else {
            return  { code : 400 , message : " somthing wrong !! " }
        }
    }


}

module.exports = ClientController
