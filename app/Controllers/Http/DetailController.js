'use strict'
const Country = use('App/Models/Country')
const Job = use('App/Models/Job')


class DetailController {

    async countries ({ response , request }) {
        const countries = await Country.all()
        return countries.toJSON()
    }

    async jobs () {
        const jobs = await Job.query().with('client.user').fetch()
        /*var x = []
        for (let job in jobs ) {
            //const client = await job.client().fetch()
            //job.fds = 'fdgfd' //.user = await client.user().fetch()
            x.push(job)
        }*/
        return jobs
    }

    async job ({  params  }) {
        try {
            return await Job.query().where('id', '=', params.id ).with('client.user').fetch()
        } catch (error) {
            return error
        }
    }

}

module.exports = DetailController
