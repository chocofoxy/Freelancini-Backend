'use strict'
const Country = use('App/Models/Country')
const Job = use('App/Models/Job')


class DetailController {

    async countries ({ response , request }) {
        const countries = await Country.all()
        return countries.toJSON()
    }

    async jobs () {

        return await Job.all()
    }

    async job ({  params  }) {
        try {
            return await Job.findOrFail(params.id)
        } catch (error) {
            return error
        }
    }

}

module.exports = DetailController
