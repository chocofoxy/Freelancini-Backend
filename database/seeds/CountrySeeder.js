'use strict'
const Country = use('App/Models/Country')
const Request = require('request-promise');


/*
|--------------------------------------------------------------------------
| CountrySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CountrySeeder {
  async run () {
      let countries = await Request('https://restcountries.eu/rest/v2/all').then( data => {
          return JSON.parse(data)    
      }).catch(
          err => console
      )

      for (let country of  countries) {
          var entity = new Country() 
          entity.name = country.name
          entity.flag = country.flag
          await entity.save()  
      }
  }
}

module.exports = CountrySeeder
