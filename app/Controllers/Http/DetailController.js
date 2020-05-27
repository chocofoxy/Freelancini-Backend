'use strict'
const Country = use('App/Models/Country')


class DetailController {

    async countries ({ response , request }) {
        const countries = await Country.all()
        return countries.toJSON()
    }

}

module.exports = DetailController
