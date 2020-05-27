'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('/create','UserController.signup')
  Route.post('/login','UserController.login')
}).prefix('account').middleware('guest')

Route.group(() => {
  Route.get('/logout','UserController.logout')
  Route.get('/informations','UserController.informations')
  Route.get('/switch','UserController.switchRole')
  Route.put('/update','UserController.update')
  Route.delete('/delete','UserController.destroy')
  Route.post('/languges','UserController.addLanguge')
  Route.delete('/languges/:id','UserController.deleteLanguge')

}).prefix('account').middleware('auth')

Route.group(() => {
  //Route.any('/submit','FreelanceController.SubmitForJob')
}).prefix('freelance').middleware(['auth','freelance'])

Route.group(() => {
  //Route.any('/submit','FreelanceController.SubmitForJob')
}).prefix('client').middleware(['auth','client'])

Route.group(() => {
  Route.get('/countries','DetailController.countries')
}).prefix('details')